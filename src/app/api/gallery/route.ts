import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/gallery - List gallery items with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = {};

    if (category) {
      where.category = category;
    }

    if (tag) {
      where.tags = {
        has: tag,
      };
    }

    const galleryItems = await db.galleryItem.findMany({
      where,
      orderBy: {
        order: 'asc',
      },
      take: limit,
      skip: offset,
    });

    const total = await db.galleryItem.count({ where });

    // Group by category
    const groupedItems = galleryItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, typeof galleryItems>);

    return NextResponse.json({
      success: true,
      data: galleryItems,
      grouped: groupedItems,
      meta: {
        limit,
        offset,
        total,
        hasMore: offset + galleryItems.length < total,
      },
    });
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: 'Failed to fetch gallery items',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    );
  }
}

// POST /api/gallery - Create a new gallery item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.image || !body.category) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Missing required fields: title, image, category',
          },
        },
        { status: 400 }
      );
    }

    // Get the highest order number for this category
    const maxOrderItem = await db.galleryItem.findFirst({
      where: { category: body.category },
      orderBy: { order: 'desc' },
    });

    const order = (maxOrderItem?.order || 0) + 1;

    const galleryItem = await db.galleryItem.create({
      data: {
        title: body.title,
        description: body.description || '',
        image: body.image,
        category: body.category,
        tags: body.tags || [],
        alt: body.alt || body.title,
        order: body.order || order,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: galleryItem,
        message: 'Gallery item created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'CREATE_ERROR',
          message: 'Failed to create gallery item',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    );
  }
}
