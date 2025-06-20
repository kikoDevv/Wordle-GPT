import { NextRequest, NextResponse } from "next/server";
import { compare, getWordsByLength, getRandomWord } from "@/lib/data/wordService";

const gameState: { [wordLength: number]: { targetWord: string; isGameWon: boolean } } = {};

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const wordLength = data.wordLengh;
    const userInput = data.userInput;

    console.log("-------selected length--------", wordLength);
    console.log("-------user input--------", userInput);

    /*------------------- Validate input -------------------*/
    if (!userInput || typeof userInput !== 'string') {
      return NextResponse.json(
        { error: "Invalid input provided" },
        { status: 400 }
      );
    }

    if (userInput.length !== wordLength) {
      return NextResponse.json(
        { error: `Input must be exactly ${wordLength} characters long` },
        { status: 400 }
      );
    }

    if (!gameState[wordLength] || gameState[wordLength].isGameWon) {
      const words = getWordsByLength(wordLength, false);
      if (words.length === 0) {
        return NextResponse.json(
          { error: `No words available for length ${wordLength}` },
          { status: 400 }
        );
      }
      const targetWord = getRandomWord(words);
      gameState[wordLength] = {
        targetWord: targetWord,
        isGameWon: false
      };
      console.log("-------new target word set--------", targetWord);
    }

    const target = gameState[wordLength].targetWord;
    console.log("-------current target--------", target);

    const result = compare(target, userInput);
    console.log("-------comparison result--------", result);

    /*------------------- Check if game is won -------------------*/
    const isWon = result.every((status) => status === "correct");
    if (isWon) {
      gameState[wordLength].isGameWon = true;
      console.log("-------game won!--------");
    }

    return NextResponse.json({
      feedback: result,
      isWon: isWon,
      targetWord: isWon ? target : undefined
    });

  } catch (error) {
    console.error("Error in guess API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
