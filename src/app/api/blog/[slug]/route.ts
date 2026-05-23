import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/blog/[slug] - Get a specific blog post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await db.blogPost.findUnique({
      where: { slug: params.slug },
    });

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Blog post not found',
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: 'Failed to fetch blog post',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    );
  }
}

// PATCH /api/blog/[slug] - Update a blog post
export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();

    const existingPost = await db.blogPost.findUnique({
      where: { slug: params.slug },
    });

    if (!existingPost) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Blog post not found',
          },
        },
        { status: 404 }
      );
    }

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (body.title !== undefined) updateData.title = body.title;
    if (body.excerpt !== undefined) updateData.excerpt = body.excerpt;
    if (body.content !== undefined) updateData.content = body.content;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.tags !== undefined) updateData.tags = body.tags;
    if (body.featuredImage !== undefined) updateData.featuredImage = body.featuredImage;
    if (body.gallery !== undefined) updateData.gallery = body.gallery;
    if (body.featured !== undefined) updateData.featured = body.featured;
    if (body.status !== undefined) {
      updateData.status = body.status.toUpperCase();
      if (body.status.toLowerCase() === 'published' && !existingPost.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }
    if (body.author) updateData.author = body.author;
    if (body.seo) updateData.seo = body.seo;

    const post = await db.blogPost.update({
      where: { slug: params.slug },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      data: post,
      message: 'Blog post updated successfully',
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UPDATE_ERROR',
          message: 'Failed to update blog post',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/[slug] - Delete a blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const existingPost = await db.blogPost.findUnique({
      where: { slug: params.slug },
    });

    if (!existingPost) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Blog post not found',
          },
        },
        { status: 404 }
      );
    }

    await db.blogPost.delete({
      where: { slug: params.slug },
    });

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'DELETE_ERROR',
          message: 'Failed to delete blog post',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    );
  }
}
