import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { repoUrl } = await req.json();

  try {
    const match = repoUrl.match(/github\.com\/([\w-]+)\/([\w-]+)/);
    if (!match) {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    const [_, owner, repo] = match;

    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch repo info' }, { status: 500 });
  }
}