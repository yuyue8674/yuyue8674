import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('f07e6f1d3e67d6c3a50b589822d949b5', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
