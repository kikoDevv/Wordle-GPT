import { NextRequest, NextResponse } from "next/server";
/*------------------- get the userInput form front end -------------------*/
export async function POST(request: NextRequest) {
  /*------------------- Start timer -------------------*/
  const gameStartedAt = new Date().toISOString();
  /*------------------- Create a game ID -------------------*/
  const gameId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  /*------------------- Get user input -------------------*/
  const data = await request.json();
  const userInput = data.guess;
  /*------------------- Send to fronEnd -------------------*/
  return NextResponse.json({
    receivedAt: gameStartedAt,
    receivedInput: userInput,
    gameId: gameId
  });
}
