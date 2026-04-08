import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { BookingStatus } from '@prisma/client';
import { randomBytes } from 'crypto';

/**
 * GET /api/bookings
 * Get bookings (filtered by user if authenticated)
 * Query params:
 * - userId: User ID (optional)
 * - status: Filter by status
 * - limit: Limit results
 * - offset: Offset for pagination
 */

/**
 * POST /api/bookings
 * Create a new booking
 * Body:
 * {
 *   userId?: string,
 *   guest: {
 *     title: string,
 *     firstName: string,
 *     lastName: string,
 *     email: string,
 *     phone: string,
 *     country: string,
 *     specialRequests?: string
 *   },
 *   rooms: [{
 *     roomId: string,
 *     checkIn: string (ISO),
 *     checkOut: string (ISO),
 *     adults: number,
 *     children: number
 *   }],
 *   promoCode?: string,
 *   paymentMethod: string
 * }
 */

// Generate unique confirmation number
function generateConfirmationNumber(): string {
  const prefix = 'G7';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = randomBytes(2).toString('hex').toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const userId = searchParams.get('userId');
    const status = searchParams.get('status')?.toUpperCase();
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0;

    const where: any = {};
    
    if (userId) {
      where.userId = userId;
    }
    
    if (status && Object.values(BookingStatus).includes(status as BookingStatus)) {
      where.status = status;
    }

    const bookings = await db.booking.findMany({
      where,
      include: {
        roomBookings: true,
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    });

    const total = await db.booking.count({ where });

    return NextResponse.json({
      success: true,
      data: bookings,
      meta: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch bookings',
          details: error instanceof Error ? error.message : undefined,
        },
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { userId, guest, rooms, promoCode, paymentMethod } = body;

    // Validate required fields
    if (!guest || !guest.firstName || !guest.lastName || !guest.email || !guest.phone || !guest.country) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_PARAMS',
            message: 'Guest information is required',
          },
        },
        { status: 400 }
      );
    }

    if (!rooms || !Array.isArray(rooms) || rooms.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_PARAMS',
            message: 'At least one room is required',
          },
        },
        { status: 400 }
      );
    }

    if (!paymentMethod) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_PARAMS',
            message: 'Payment method is required',
          },
        },
        { status: 400 }
      );
    }

    // Validate each room booking
    for (const roomBooking of rooms) {
      if (!roomBooking.roomId || !roomBooking.checkIn || !roomBooking.checkOut) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'INVALID_ROOM_BOOKING',
              message: 'Each room must have roomId, checkIn, and checkOut',
            },
          },
          { status: 400 }
        );
      }

      const checkIn = new Date(roomBooking.checkIn);
      const checkOut = new Date(roomBooking.checkOut);

      if (checkIn >= checkOut) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'INVALID_DATES',
              message: 'Check-out must be after check-in',
            },
          },
          { status: 400 }
        );
      }
    }

    // Get room details and calculate pricing
    const roomDetails = await Promise.all(
      rooms.map(async (roomBooking: any) => {
        const room = await db.room.findUnique({
          where: { id: roomBooking.roomId },
        });

        if (!room) {
          throw new Error(`Room not found: ${roomBooking.roomId}`);
        }

        const checkIn = new Date(roomBooking.checkIn);
        const checkOut = new Date(roomBooking.checkOut);
        const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
        const pricePerNight = room.basePrice;
        const totalPrice = pricePerNight * nights;

        return {
          ...roomBooking,
          roomName: room.name,
          pricePerNight,
          totalPrice,
          nights,
        };
      })
    );

    // Calculate totals
    const subtotal = roomDetails.reduce((sum, r) => sum + r.totalPrice, 0);
    const taxes = subtotal * 0.12;
    const serviceFee = subtotal * 0.05;
    const nights = roomDetails[0].nights;
    const roomsCount = rooms.length;
    const resortFee = 25 * nights * roomsCount;
    const fees = serviceFee + resortFee;

    // Apply promo code
    let discount = 0;
    if (promoCode) {
      const offer = await db.offer.findFirst({
        where: {
          promoCode: promoCode.toUpperCase(),
          active: true,
          startDate: { lte: new Date() },
          endDate: { gte: new Date() },
        },
      });

      if (offer) {
        if (offer.discountType === 'percentage') {
          discount = subtotal * (offer.discountValue / 100);
          if (offer.maxDiscount && discount > offer.maxDiscount) {
            discount = offer.maxDiscount;
          }
        } else {
          discount = offer.discountValue;
        }
      }
    }

    const totalAmount = subtotal + taxes + fees - discount;
    const adults = roomDetails.reduce((sum, r) => sum + (r.adults || 1), 0);
    const children = roomDetails.reduce((sum, r) => sum + (r.children || 0), 0);

    // Create booking
    const booking = await db.booking.create({
      data: {
        confirmationNumber: generateConfirmationNumber(),
        userId,
        guestTitle: guest.title || 'Mr',
        guestFirstName: guest.firstName,
        guestLastName: guest.lastName,
        guestEmail: guest.email,
        guestPhone: guest.phone,
        guestCountry: guest.country,
        specialRequests: guest.specialRequests,
        status: BookingStatus.PENDING,
        paymentStatus: 'PENDING',
        checkIn: new Date(rooms[0].checkIn),
        checkOut: new Date(rooms[0].checkOut),
        adults,
        children,
        rooms: roomsCount,
        subtotal,
        taxes,
        fees,
        discount,
        totalAmount,
        currency: 'USD',
        promoCode: discount > 0 ? promoCode : null,
        roomBookings: {
          create: roomDetails.map((r) => ({
            roomId: r.roomId,
            roomName: r.roomName,
            checkIn: new Date(r.checkIn),
            checkOut: new Date(r.checkOut),
            adults: r.adults || 1,
            children: r.children || 0,
            pricePerNight: r.pricePerNight,
            totalPrice: r.totalPrice,
          })),
        },
      },
      include: {
        roomBookings: true,
      },
    });

    // Add loyalty points if user is a member (5 points per $1 spent)
    if (userId) {
      const pointsEarned = Math.floor(totalAmount * 5);
      
      // Check if user has a loyalty member record
      const member = await db.loyaltyMember.findUnique({
        where: { userId },
      });

      if (member) {
        await db.loyaltyMember.update({
          where: { id: member.id },
          data: {
            points: { increment: pointsEarned },
            pointsEarned: { increment: pointsEarned },
          },
        });

        // Create points transaction
        await db.pointsTransaction.create({
          data: {
            memberId: member.id,
            type: 'EARNED',
            points: pointsEarned,
            description: `Points earned from booking ${booking.confirmationNumber}`,
            bookingId: booking.id,
            balance: member.points + pointsEarned,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: booking,
      message: 'Booking created successfully',
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to create booking',
          details: error instanceof Error ? error.message : undefined,
        },
      },
      { status: 500 }
    );
  }
}
