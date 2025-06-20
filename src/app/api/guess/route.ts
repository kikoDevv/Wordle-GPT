import { NextRequest, NextResponse } from "next/server";
import { compare, getWordsByLength, getRandomWord } from "@/lib/data/wordService";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const guess = data.guess;
  console.log("from guess userInput resived------>", guess);
  console.log("from guess wordlengh resived------>", data.wordLengh);
  /*------------------- Compare user input with target word -------------------*/
  const wordsByLenght = getWordsByLength(data.wordLengh, false);
  const randomWord = getRandomWord(wordsByLenght);
  const result = compare(randomWord, data.guess);
  console.log("---------------Compared------------------->", result)
  /*------------------- Teturn validation -------------------*/
  return NextResponse.json({ validation: data});
}
