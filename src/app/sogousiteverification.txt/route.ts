import { NextResponse } from 'next/server';

export async function GET() {
  const content = 'WrqpdcXlZw';
  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
