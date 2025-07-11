import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, name, subtext, repoLinks, templateKey, showGithubIcon } = body;
    console.log(body);

    if (!username || typeof username !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid username' }, { status: 400 });
    }

    if (!Array.isArray(repoLinks)) {
      return NextResponse.json({ error: 'repoLinks must be an array' }, { status: 400 });
    }

    await adminDb.collection('portfolios').doc(username).set({
      username,
      name: name || '',
      subtext: subtext || '',
      repoLinks,
      templateKey: templateKey || 'light',
      showGithubIcon,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error in /api/publish:', error.message || error);
    return NextResponse.json(
      { error: 'Failed to publish', details: error.message || error },
      { status: 500 }
    );
  }
}