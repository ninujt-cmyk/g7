import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/blog - List blog posts with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const status = searchParams.get('status') || 'published';
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '12');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = {
      status: status as any,
    };

    if (category) {
      where.category = category;
    }

    if (tag) {
      where.tags = {
        has: tag,
      };
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    const posts = await db.blogPost.findMany({
      where,
      orderBy: {
        publishedAt: 'desc',
      },
      take: limit,
      skip: offset,
    });

    const total = await db.blogPost.count({ where });

    return NextResponse.json({
      success: true,
      data: posts,
      meta: {
        limit,
        offset,
        total,
        hasMore: offset + posts.length < total,
      },
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: 'Failed to fetch blog posts',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    );
  }
}

// POST /api/blog - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.content || !body.author?.name) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Missing required fields: title, content, author.name',
          },
        },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = body.slug || 
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    // Check if slug already exists
    const existingPost = await db.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DUPLICATE_SLUG',
            message: 'A post with this slug already exists',
          },
        },
        { status: 409 }
      );
    }

    const post = await db.blogPost.create({
      data: {
        slug,
        title: body.title,
        excerpt: body.excerpt || body.content.slice(0, 200) + '...',
        content: body.content,
        author: {
          name: body.author.name,
          avatar: body.author.avatar,
          bio: body.author.bio,
        },
        category: body.category || 'general',
        tags: body.tags || [],
        featuredImage: body.featuredImage || '',
        gallery: body.gallery || [],
        publishedAt: body.status === 'published' ? new Date() : null,
        updatedAt: new Date(),
        seo: body.seo || {
          metaTitle: body.title,
          metaDescription: body.excerpt || '',
          keywords: [],
        },
        status: body.status || 'draft',
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: post,
        message: 'Blog post created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'CREATE_ERROR',
          message: 'Failed to create blog post',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    );
  }
}
