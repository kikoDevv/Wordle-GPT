import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const guess = data.guess;
  console.log("from guess userInput resived------>", guess);
  /*------------------- Teturn validation -------------------*/
  return NextResponse.json({ validation: data});
}
