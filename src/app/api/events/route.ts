import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/events - List events with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const venueId = searchParams.get('venueId');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = {};

    if (type) {
      where.type = type;
    }

    if (venueId) {
      where.venueId = venueId;
    }

    if (status) {
      where.status = status;
    }

    const events = await db.event.findMany({
      where,
      include: {
        venue: true,
      },
      orderBy: {
        date: 'asc',
      },
      take: limit,
      skip: offset,
    });

    const total = await db.event.count({ where });

    return NextResponse.json({
      success: true,
      data: events,
      meta: {
        limit,
        offset,
        total,
        hasMore: offset + events.length < total,
      },
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: 'Failed to fetch events',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    );
  }
}

// POST /api/events - Create a new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'type', 'venueId', 'date', 'startTime', 'endTime', 'expectedGuests', 'contact'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'VALIDATION_ERROR',
              message: `Missing required field: ${field}`,
            },
          },
          { status: 400 }
        );
      }
    }

    // Create event
    const event = await db.event.create({
      data: {
        name: body.name,
        type: body.type,
        venueId: body.venueId,
        venueName: body.venueName,
        date: new Date(body.date),
        startTime: body.startTime,
        endTime: body.endTime,
        expectedGuests: parseInt(body.expectedGuests),
        description: body.description || '',
        requirements: body.requirements || [],
        catering: body.catering || { required: false },
        accommodation: body.accommodation || { required: false },
        status: body.status || 'pending',
        estimatedBudget: body.estimatedBudget ? parseFloat(body.estimatedBudget) : null,
        currency: body.currency || 'INR',
        contact: {
          title: body.contact.title || 'Mr',
          firstName: body.contact.firstName,
          lastName: body.contact.lastName,
          email: body.contact.email,
          phone: body.contact.phone,
          country: body.contact.country || 'India',
          specialRequests: body.contact.specialRequests,
        },
      },
      include: {
        venue: true,
      },
    });

    // Generate confirmation number
    const confirmationNumber = `EVT-${String(event.id).slice(-6).toUpperCase()}`;
    await db.event.update({
      where: { id: event.id },
      data: { confirmationNumber },
    });

    event.confirmationNumber = confirmationNumber;

    return NextResponse.json(
      {
        success: true,
        data: event,
        message: 'Event created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'CREATE_ERROR',
          message: 'Failed to create event',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    );
  }
}
