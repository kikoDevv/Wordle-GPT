import { NextRequest, NextResponse } from "next/server";
import { compare, getWordsByLength, getRandomWord } from "@/lib/data/wordService";

let gameStarted = false;
let selectedWordLenght = 0;
let targetWord = "";
console.log("------target word------", targetWord);
export async function POST(request: NextRequest) {
  const data = await request.json();
  const userInput = data.guess;
  console.log("----target-------", targetWord);
  if (!gameStarted) {
    console.log("--------game started------");
    gameStarted = true;
    selectedWordLenght = data.wordLengh;
    console.log("------selected lenght------", selectedWordLenght);
    targetWord = getRandomWord(getWordsByLength(selectedWordLenght, false));
  }
  const result = compare(targetWord, userInput);

  if (result.every((index) => index === "correct")) {
    gameStarted = false;
  }

  console.log("--------result--------", result);

  return NextResponse.json({
    validation: result,
  });
}
