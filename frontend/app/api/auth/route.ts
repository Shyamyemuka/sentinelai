import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:8000';
    
    const response = await fetch(`${backendUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errData = await response.json();
      return NextResponse.json(
        { 
          error: errData?.detail?.error || 'Invalid credentials', 
          code: errData?.detail?.code || 'INVALID_CREDENTIALS' 
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    const res = NextResponse.json({ success: true });
    
    // Store JWT token in an httpOnly cookie securely
    res.cookies.set('sentinel_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
