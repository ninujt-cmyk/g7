import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { addDays, format } from '@/lib/utils';

/**
 * GET /api/availability
 * Check room availability for dates
 * Query params:
 * - checkIn: Check-in date (ISO string)
 * - checkOut: Check-out date (ISO string)
 * - adults: Number of adults (required)
 * - children: Number of children (default: 0)
 * - rooms: Number of rooms (default: 1)
 * - type: Room type filter (optional)
 */

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const checkInStr = searchParams.get('checkIn');
    const checkOutStr = searchParams.get('checkOut');
    const adults = searchParams.get('adults');
    const children = searchParams.get('children');
    const rooms = searchParams.get('rooms');
    const type = searchParams.get('type')?.toUpperCase();

    // Validate required parameters
    if (!checkInStr || !checkOutStr || !adults) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_PARAMS',
            message: 'checkIn, checkOut, and adults are required',
          },
        },
        { status: 400 }
      );
    }

    const checkIn = new Date(checkInStr);
    const checkOut = new Date(checkOutStr);
    const adultsNum = parseInt(adults);
    const childrenNum = children ? parseInt(children) : 0;
    const roomsNum = rooms ? parseInt(rooms) : 1;
    const totalGuests = adultsNum + childrenNum;

    // Validate dates
    if (checkIn >= checkOut) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_DATES',
            message: 'Check-out date must be after check-in date',
          },
        },
        { status: 400 }
      );
    }

    if (checkIn < new Date()) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_DATES',
            message: 'Check-in date must be in the future',
          },
        },
        { status: 400 }
      );
    }

    // Build where clause
    const where: any = {
      active: true,
      maxOccupancy: { gte: totalGuests },
      maxAdults: { gte: adultsNum },
      maxChildren: { gte: childrenNum },
    };

    if (type) {
      where.type = type;
    }

    // Get rooms
    const availableRooms = await db.room.findMany({
      where,
      orderBy: [
        { sortOrder: 'asc' },
        { basePrice: 'asc' },
      ],
    });

    // Simulate availability check
    // In production, this would query actual bookings
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
    const roomsWithAvailability = availableRooms.map((room) => {
      const randomAvailable = Math.floor(Math.random() * (room.totalRooms + 1));
      const available = randomAvailable >= roomsNum;
      const pricePerNight = room.basePrice;
      const totalPrice = pricePerNight * nights * roomsNum;
      const taxes = totalPrice * 0.12; // 12% tax
      const fees = 50; // Fixed fee
      const total = totalPrice + taxes + fees;

      return {
        id: room.id,
        name: room.name,
        type: room.type.toLowerCase(),
        view: room.view.toLowerCase(),
        description: room.shortDescription,
        images: JSON.parse(room.images || '[]'),
        basePrice: pricePerNight,
        currency: room.currency,
        maxOccupancy: room.maxOccupancy,
        maxAdults: room.maxAdults,
        maxChildren: room.maxChildren,
        beds: JSON.parse(room.beds || '[]'),
        amenities: JSON.parse(room.amenities || '[]'),
        rating: room.rating,
        reviewCount: room.reviewCount,
        availability: {
          available: available,
          totalRooms: room.totalRooms,
          availableRooms: randomAvailable,
        },
        pricing: {
          basePrice: pricePerNight,
          nights,
          rooms: roomsNum,
          subtotal: totalPrice,
          taxes: parseFloat(taxes.toFixed(2)),
          fees,
          total: parseFloat(total.toFixed(2)),
          currency: room.currency,
        },
      };
    });

    // Filter to only show available rooms
    const availableRoomsOnly = roomsWithAvailability.filter((room) => room.availability.available);

    return NextResponse.json({
      success: true,
      data: {
        checkIn: format(checkIn, 'yyyy-MM-dd'),
        checkOut: format(checkOut, 'yyyy-MM-dd'),
        nights,
        guests: {
          adults: adultsNum,
          children: childrenNum,
          total: totalGuests,
        },
        roomsRequested: roomsNum,
        rooms: availableRoomsOnly,
        totalRooms: roomsWithAvailability.length,
        availableRooms: availableRoomsOnly.length,
      },
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to check availability',
          details: error instanceof Error ? error.message : undefined,
        },
      },
      { status: 500 }
    );
  }
}
