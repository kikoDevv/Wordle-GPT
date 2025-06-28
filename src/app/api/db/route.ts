import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const trys = await req.json();
  console.log("Backend recived trys data -->", trys);
  return NextResponse.json("Backend resived trys data");
}