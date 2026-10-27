import { NextRequest, NextResponse } from 'next/server';
import { createOrder, lookupOrderStatus } from '@/lib/db';
import { OrderInput } from '@/lib/types';

// POST /api/orders - Creates an order securely
export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'anonymous';

    const body: OrderInput = await request.json();

    const result = await createOrder(body, ip);

    if (!result.success || !result.order) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to place order.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Order placed successfully!',
        order: result.order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API Error in POST /api/orders:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected server error occurred while processing your order.',
      },
      { status: 500 }
    );
  }
}

// GET /api/orders - Secure order lookup only!
// Strictly prevents public browsing or data harvesting.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderNumber = searchParams.get('orderNumber');
  const phone = searchParams.get('phone');

  // If someone tries to query without both credentials, reject immediately
  if (!orderNumber || !phone) {
    return NextResponse.json(
      {
        error:
          'Access forbidden. For privacy and security, public listing of orders is prohibited. Please provide both your Order Number and registered Phone Number.',
      },
      { status: 403 }
    );
  }

  const result = lookupOrderStatus(orderNumber, phone);

  if (!result.found) {
    return NextResponse.json(
      {
        error: result.error || 'Order not found.',
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    order: result.order,
  });
}
