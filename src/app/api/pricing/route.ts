import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { format } from '@/lib/utils';

/**
 * GET /api/pricing
 * Calculate pricing for a booking
 * Query params:
 * - roomId: Room ID (required)
 * - checkIn: Check-in date (ISO string, required)
 * - checkOut: Check-out date (ISO string, required)
 * - adults: Number of adults (required)
 * - children: Number of children (default: 0)
 * - rooms: Number of rooms (default: 1)
 * - promoCode: Promo code (optional)
 */

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const roomId = searchParams.get('roomId');
    const checkInStr = searchParams.get('checkIn');
    const checkOutStr = searchParams.get('checkOut');
    const adults = searchParams.get('adults');
    const children = searchParams.get('children');
    const rooms = searchParams.get('rooms');
    const promoCode = searchParams.get('promoCode');

    // Validate required parameters
    if (!roomId || !checkInStr || !checkOutStr || !adults) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_PARAMS',
            message: 'roomId, checkIn, checkOut, and adults are required',
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

    // Get room
    const room = await db.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'ROOM_NOT_FOUND',
            message: 'Room not found',
          },
        },
        { status: 404 }
      );
    }

    // Validate capacity
    if (room.maxOccupancy < (adultsNum + childrenNum)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'EXCEEDS_CAPACITY',
            message: `Room capacity exceeded. Max ${room.maxOccupancy} guests allowed.`,
          },
        },
        { status: 400 }
      );
    }

    // Calculate pricing
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const basePricePerNight = room.basePrice;
    const subtotal = basePricePerNight * nights * roomsNum;
    
    // Taxes (12%)
    const taxes = subtotal * 0.12;
    
    // Fees (service fee, resort fee, etc.)
    const serviceFee = subtotal * 0.05; // 5% service fee
    const resortFee = 2000 * nights * roomsNum; // ₹2,000 per night per room
    const fees = serviceFee + resortFee;
    
    // Apply promo code if provided
    let discount = 0;
    let promoApplied = null;
    
    if (promoCode) {
      // Check for valid promo code
      const offer = await db.offer.findFirst({
        where: {
          promoCode: promoCode.toUpperCase(),
          active: true,
          startDate: { lte: checkIn },
          endDate: { gte: checkIn },
        },
      });

      if (offer) {
        if (offer.discountType === 'percentage') {
          discount = subtotal * (offer.discountValue / 100);
          // Cap max discount if specified
          if (offer.maxDiscount && discount > offer.maxDiscount) {
            discount = offer.maxDiscount;
          }
        } else {
          discount = offer.discountValue;
        }
        promoApplied = {
          code: offer.promoCode,
          name: offer.name,
          type: offer.discountType,
          value: offer.discountValue,
          discountAmount: discount,
        };
      }
    }

    // Calculate total
    const total = subtotal + taxes + fees - discount;

    // Breakdown
    const pricing = {
      room: {
        name: room.name,
        type: room.type.toLowerCase(),
        view: room.view.toLowerCase(),
        images: JSON.parse(room.images || '[]'),
      },
      stay: {
        checkIn: format(checkIn, 'MMM dd, yyyy'),
        checkOut: format(checkOut, 'MMM dd, yyyy'),
        nights,
      },
      guests: {
        adults: adultsNum,
        children: childrenNum,
        rooms: roomsNum,
        totalGuests: adultsNum + childrenNum,
      },
      pricing: {
        basePrice: basePricePerNight,
        subtotal: parseFloat(subtotal.toFixed(2)),
        taxes: parseFloat(taxes.toFixed(2)),
        fees: {
          service: parseFloat(serviceFee.toFixed(2)),
          resort: parseFloat(resortFee.toFixed(2)),
          total: parseFloat(fees.toFixed(2)),
        },
        discount: discount > 0 ? {
          amount: parseFloat(discount.toFixed(2)),
          promo: promoApplied,
        } : null,
        total: parseFloat(total.toFixed(2)),
        currency: room.currency,
      },
      perNight: {
        beforeDiscount: basePricePerNight * roomsNum,
        afterDiscount: discount > 0 ? parseFloat(((subtotal - discount) / nights).toFixed(2)) : basePricePerNight * roomsNum,
      },
    };

    return NextResponse.json({
      success: true,
      data: pricing,
    });
  } catch (error) {
    console.error('Error calculating pricing:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to calculate pricing',
          details: error instanceof Error ? error.message : undefined,
        },
      },
      { status: 500 }
    );
  }
}
