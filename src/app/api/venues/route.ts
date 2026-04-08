import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/venues - List venues with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const featured = searchParams.get('featured');
    const minCapacity = searchParams.get('minCapacity');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: any = {};

    if (type) {
      where.type = {
        has: type,
      };
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (minCapacity) {
      const minCap = parseInt(minCapacity);
      where.capacity = {
        OR: [
          { theater: { gte: minCap } },
          { banquet: { gte: minCap } },
          { cocktail: { gte: minCap } },
        ],
      };
    }

    const venues = await db.venue.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { name: 'asc' },
      ],
      take: limit,
    });

    const total = await db.venue.count({ where });

    return NextResponse.json({
      success: true,
      data: venues,
      meta: {
        total,
        limit,
      },
    });
  } catch (error) {
    console.error('Error fetching venues:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: 'Failed to fetch venues',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    );
  }
}

// POST /api/venues - Create a new venue (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.type || !body.capacity) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Missing required fields: name, type, capacity',
          },
        },
        { status: 400 }
      );
    }

    const venue = await db.venue.create({
      data: {
        name: body.name,
        description: body.description || '',
        type: body.type,
        capacity: body.capacity,
        size: body.size || 0,
        images: body.images || [],
        floorPlan: body.floorPlan || '',
        features: body.features || [],
        equipment: body.equipment || [],
        location: body.location || '',
        naturalLight: body.naturalLight || false,
        outdoorAccess: body.outdoorAccess || false,
        featured: body.featured || false,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: venue,
        message: 'Venue created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating venue:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'CREATE_ERROR',
          message: 'Failed to create venue',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    );
  }
}
