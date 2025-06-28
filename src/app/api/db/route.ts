import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("Backend recived trys data -->", data.trys, data.userName);
  return NextResponse.json("Backend resived trys data");
}