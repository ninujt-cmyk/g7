import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Room, RoomType, RoomView } from '@prisma/client';

/**
 * GET /api/rooms
 * Get rooms with optional filters
 * Query params:
 * - type: Filter by room type (standard, deluxe, suite, presidential, royal)
 * - view: Filter by view (city, garden, ocean, mountain, pool, courtyard)
 * - minPrice: Minimum price
 * - maxPrice: Maximum price
 * - adults: Number of adults
 * - children: Number of children
 * - featured: Show only featured rooms
 * - limit: Limit number of results
 * - sort: Sort by (price, rating, name, popularity)
 * - order: Sort order (asc, desc)
 */

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const type = searchParams.get('type')?.toUpperCase();
    const view = searchParams.get('view')?.toUpperCase();
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
    const adults = searchParams.get('adults') ? parseInt(searchParams.get('adults')!) : undefined;
    const children = searchParams.get('children') ? parseInt(searchParams.get('children')!) : undefined;
    const featured = searchParams.get('featured') === 'true';
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const sort = searchParams.get('sort') || 'sortOrder';
    const order = searchParams.get('order') || 'asc';

    // Build where clause
    const where: any = {
      active: true,
    };

    if (type && Object.values(RoomType).includes(type as RoomType)) {
      where.type = type;
    }

    if (view && Object.values(RoomView).includes(view as RoomView)) {
      where.view = view;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.basePrice = {};
      if (minPrice !== undefined) where.basePrice.gte = minPrice;
      if (maxPrice !== undefined) where.basePrice.lte = maxPrice;
    }

    if (adults !== undefined || children !== undefined) {
      const totalGuests = (adults || 0) + (children || 0);
      if (totalGuests > 0) {
        where.maxOccupancy = { gte: totalGuests };
      }
    }

    if (featured) {
      where.featured = true;
    }

    // Build order clause
    const orderBy: any = {};
    if (sort === 'price') {
      orderBy.basePrice = order;
    } else if (sort === 'rating') {
      orderBy.rating = order;
    } else if (sort === 'name') {
      orderBy.name = order;
    } else if (sort === 'popularity') {
      orderBy.reviewCount = order;
    } else {
      orderBy.sortOrder = order;
    }

    // Query rooms
    const rooms = await db.room.findMany({
      where,
      orderBy,
      take: limit,
    });

    // Transform rooms to match frontend types
    const transformedRooms = rooms.map((room) => ({
      id: room.id,
      name: room.name,
      type: room.type.toLowerCase(),
      view: room.view.toLowerCase(),
      description: room.description,
      shortDescription: room.shortDescription,
      images: JSON.parse(room.images || '[]'),
      virtualTourUrl: room.virtualTourUrl || undefined,
      basePrice: room.basePrice,
      currency: room.currency,
      size: room.size,
      maxOccupancy: room.maxOccupancy,
      maxAdults: room.maxAdults,
      maxChildren: room.maxChildren,
      beds: JSON.parse(room.beds || '[]'),
      amenities: JSON.parse(room.amenities || '[]'),
      features: {
        smoking: room.smokingAllowed,
        petFriendly: room.petFriendly,
        accessible: room.accessible,
        connectingRooms: room.connectingRooms,
      },
      availability: {
        total: room.totalRooms,
        available: Math.floor(Math.random() * room.totalRooms), // Random availability for demo
      },
      rating: room.rating,
      reviewCount: room.reviewCount,
      featured: room.featured,
      sortOrder: room.sortOrder,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
    }));

    return NextResponse.json({
      success: true,
      data: transformedRooms,
      meta: {
        count: transformedRooms.length,
        filters: {
          type,
          view,
          minPrice,
          maxPrice,
          adults,
          children,
          featured,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch rooms',
          details: error instanceof Error ? error.message : undefined,
        },
      },
      { status: 500 }
    );
  }
}
