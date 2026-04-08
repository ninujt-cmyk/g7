import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { BookingStatus, PaymentStatus } from '@prisma/client';

/**
 * GET /api/bookings/[id]
 * Get a specific booking by ID or confirmation number
 */

/**
 * PATCH /api/bookings/[id]
 * Update a booking (status, payment status, etc.)
 */

/**
 * DELETE /api/bookings/[id]
 * Cancel a booking
 */

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const booking = await db.booking.findUnique({
      where: {
        id: id,
      },
      include: {
        roomBookings: {
          include: {
            room: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!booking) {
      // Try to find by confirmation number
      const bookingByConfirmation = await db.booking.findUnique({
        where: {
          confirmationNumber: id,
        },
        include: {
          roomBookings: {
            include: {
              room: true,
            },
          },
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      if (!bookingByConfirmation) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'BOOKING_NOT_FOUND',
              message: 'Booking not found',
            },
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: bookingByConfirmation,
      });
    }

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch booking',
          details: error instanceof Error ? error.message : undefined,
        },
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const booking = await db.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'BOOKING_NOT_FOUND',
            message: 'Booking not found',
          },
        },
        { status: 404 }
      );
    }

    // Validate status transitions
    if (body.status) {
      const allowedTransitions: Record<BookingStatus, BookingStatus[]> = {
        PENDING: ['CONFIRMED', 'CANCELLED'],
        CONFIRMED: ['CHECKED_IN', 'CANCELLED'],
        CHECKED_IN: ['CHECKED_OUT', 'CANCELLED'],
        CHECKED_OUT: [],
        CANCELLED: [],
        NO_SHOW: ['CANCELLED'],
        REFUNDED: [],
      };

      const currentStatus = booking.status;
      const newStatus = body.status.toUpperCase();

      if (!Object.values(BookingStatus).includes(newStatus as BookingStatus)) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'INVALID_STATUS',
              message: 'Invalid booking status',
            },
          },
          { status: 400 }
        );
      }

      if (!allowedTransitions[currentStatus].includes(newStatus as BookingStatus)) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'INVALID_STATUS_TRANSITION',
              message: `Cannot transition from ${currentStatus} to ${newStatus}`,
            },
          },
          { status: 400 }
        );
      }
    }

    // Update booking
    const updatedBooking = await db.booking.update({
      where: { id },
      data: {
        ...(body.status && { status: body.status }),
        ...(body.paymentStatus && { paymentStatus: body.paymentStatus }),
        ...(body.specialRequests && { specialRequests: body.specialRequests }),
        updatedAt: new Date(),
      },
      include: {
        roomBookings: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedBooking,
      message: 'Booking updated successfully',
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to update booking',
          details: error instanceof Error ? error.message : undefined,
        },
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const booking = await db.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'BOOKING_NOT_FOUND',
            message: 'Booking not found',
          },
        },
        { status: 404 }
      );
    }

    // Check if booking can be cancelled
    if (booking.status === BookingStatus.CANCELLED || booking.status === BookingStatus.CHECKED_OUT) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'CANNOT_CANCEL',
            message: 'This booking cannot be cancelled',
          },
        },
        { status: 400 }
      );
    }

    // Cancel booking
    const cancelledBooking = await db.booking.update({
      where: { id },
      data: {
        status: BookingStatus.CANCELLED,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      data: cancelledBooking,
      message: 'Booking cancelled successfully',
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to cancel booking',
          details: error instanceof Error ? error.message : undefined,
        },
      },
      { status: 500 }
    );
  }
}
