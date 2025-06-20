import { NextRequest, NextResponse } from "next/server";
/*------------------- get the userInput form front end -------------------*/
export async function POST(request: NextRequest) {
  /*------------------- Start timer -------------------*/
  const gameStartedAt = new Date().toISOString();
  console.log("API Game started at---------------------->:", gameStartedAt);
  /*------------------- Create a game ID -------------------*/
  const gameId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  /*------------------- Get user input -------------------*/
  const body = await request.json();
  const userInput = body.guess;
  console.log("API Received userInput--------------------------------------->", userInput);
  /*------------------- Send to fronEnd -------------------*/
  return NextResponse.json({
    receivedAt: gameStartedAt,
    receivedInput: userInput,
    gameId: gameId
  });
}
