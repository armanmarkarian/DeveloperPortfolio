import { NextRequest, NextResponse } from 'next/server';
import { getPortfolioByUsername } from '@/lib/firebase';

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const { username } = params;

  if (!username) {
    return NextResponse.json({ error: 'Missing username' }, { status: 400 });
  }

  try {
    const data = await getPortfolioByUsername(username);

    if (!data) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching portfolio:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}