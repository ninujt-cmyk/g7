import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { OfferType } from '@prisma/client';

/**
 * GET /api/offers
 * Get offers with optional filters
 * Query params:
 * - type: Filter by offer type
 * - active: Show only active offers (default: true)
 * - featured: Show only featured offers
 * - promoCode: Find specific offer by promo code
 * - limit: Limit number of results
 */

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const type = searchParams.get('type')?.toUpperCase();
    const active = searchParams.get('active') !== 'false';
    const featured = searchParams.get('featured') === 'true';
    const promoCode = searchParams.get('promoCode');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

    const where: any = {};

    if (active) {
      const now = new Date();
      where.active = true;
      where.startDate = { lte: now };
      where.endDate = { gte: now };
    }

    if (type && Object.values(OfferType).includes(type as OfferType)) {
      where.type = type;
    }

    if (featured) {
      where.featured = true;
    }

    if (promoCode) {
      where.promoCode = promoCode.toUpperCase();
    }

    const offers = await db.offer.findMany({
      where,
      orderBy: [
        { sortOrder: 'asc' },
        { startDate: 'desc' },
      ],
      take: limit,
    });

    // Transform offers
    const transformedOffers = offers.map((offer) => ({
      id: offer.id,
      name: offer.name,
      description: offer.description,
      shortDescription: offer.shortDescription,
      type: offer.type.toLowerCase().replace('_', '-'),
      images: JSON.parse(offer.images || '[]'),
      startDate: offer.startDate,
      endDate: offer.endDate,
      discount: {
        type: offer.discountType,
        value: offer.discountValue,
      },
      minStay: offer.minStay,
      maxDiscount: offer.maxDiscount,
      applicableTo: JSON.parse(offer.applicableTo || '[]'),
      terms: JSON.parse(offer.terms || '[]'),
      promoCode: offer.promoCode,
      featured: offer.featured,
      active: offer.active,
      sortOrder: offer.sortOrder,
    }));

    return NextResponse.json({
      success: true,
      data: transformedOffers,
      meta: {
        count: transformedOffers.length,
        filters: {
          type,
          active,
          featured,
          promoCode,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching offers:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch offers',
          details: error instanceof Error ? error.message : undefined,
        },
      },
      { status: 500 }
    );
  }
}
