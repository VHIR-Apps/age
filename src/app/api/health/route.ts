import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    app: 'Age Calculator BD - VHIR Tech',
    timestamp: new Date().toISOString(),
  });
}
