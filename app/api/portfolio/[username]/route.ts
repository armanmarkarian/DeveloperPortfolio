import { NextRequest, NextResponse } from 'next/server';
import { getPortfolioByUsername } from '@/lib/firebase'; // adjust path if needed

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const { username } = params;

  if (!username || typeof username !== 'string') {
    return NextResponse.json({ error: 'Invalid username' }, { status: 400 });
  }

  try {
    const data = await getPortfolioByUsername(username);

    if (!data) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}