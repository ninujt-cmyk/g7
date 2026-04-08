import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST /api/contact - Submit a contact form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Missing required fields: name, email, message',
          },
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_EMAIL',
            message: 'Invalid email format',
          },
        },
        { status: 400 }
      );
    }

    // Validate consent
    if (!body.consent) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'CONSENT_REQUIRED',
            message: 'Privacy policy consent is required',
          },
        },
        { status: 400 }
      );
    }

    // Create contact form entry
    const contactForm = await db.contactForm.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || '',
        subject: body.subject || '',
        message: body.message,
        interest: body.interest || '',
        preferredContact: body.preferredContact || 'email',
        consent: true,
      },
    });

    // In a real application, you would also:
    // 1. Send a confirmation email to the user
    // 2. Send notification email to the relevant department
    // 3. Store the submission in a CRM system
    // 4. Add to a newsletter list if opted in

    return NextResponse.json(
      {
        success: true,
        data: {
          id: contactForm.id,
          message: 'Your message has been sent successfully. We will get back to you within 24 hours.',
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SUBMIT_ERROR',
          message: 'Failed to submit contact form',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    );
  }
}

// GET /api/contact - List contact form submissions (admin only)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const status = searchParams.get('status'); // new, responded, archived

    const where: any = {};

    if (status) {
      where.status = status;
    }

    const submissions = await db.contactForm.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    });

    const total = await db.contactForm.count({ where });

    return NextResponse.json({
      success: true,
      data: submissions,
      meta: {
        limit,
        offset,
        total,
        hasMore: offset + submissions.length < total,
      },
    });
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: 'Failed to fetch contact submissions',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    );
  }
}
