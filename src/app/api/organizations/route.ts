import { NextResponse } from 'next/server';

export async function GET() {
  const KINDE_API_TOKEN = process.env.KINDE_API_TOKEN;
  const KINDE_ISSUER_URL = process.env.KINDE_ISSUER_URL;

  if (!KINDE_API_TOKEN || !KINDE_ISSUER_URL) {
    return NextResponse.json(
      { error: 'Missing API key or domain configuration' }, 
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${KINDE_ISSUER_URL}/api/v1/organizations`, {
      headers: {
        Authorization: `Bearer ${KINDE_API_TOKEN}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch organizations' }, 
      { status: 500 }
    );
  }
} 