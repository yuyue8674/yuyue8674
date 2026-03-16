import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('64e70fc676a07fde253e7ee07b18fcc3', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
