import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword') || '';
  const apiKey = process.env.TICKETMASTER_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&keyword=${keyword}&countryCode=GB`
    );

    if (!res.ok) {
      
      return NextResponse.json(
        { error: 'Ticketmaster API request failed' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Server fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}