import { NextRequest, NextResponse } from "next/server";
import { compare, getWordsByLength, getRandomWord } from "@/lib/data/wordService";

// In-memory game state storage (per word length and repeat mode)
const gameState: { [key: string]: { targetWord: string; isGameWon: boolean } } = {};

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const wordLength = data.wordLengh;
    const userInput = data.userInput;
    const isRepeat = data.isRepeat || false;

    console.log("-------selected length--------", wordLength);
    console.log("-------user input--------", userInput);
    console.log("-------repeat mode--------", isRepeat);

    /*------------------- Validate input -------------------*/
    if (!userInput || typeof userInput !== 'string') {
      return NextResponse.json(
        { error: "Invalid input provided" },
        { status: 400 }
      );
    }

    if (userInput.length !== wordLength) {
      return NextResponse.json(
        { error: `Input must be ${wordLength} long` },
        { status: 400 }
      );
    }

    // Create a unique key for game state based on word length and repeat mode
    const gameKey = `${wordLength}_${isRepeat}`;

    if (!gameState[gameKey] || gameState[gameKey].isGameWon) {
      const words = getWordsByLength(wordLength, isRepeat);
      if (words.length === 0) {
        return NextResponse.json(
          { error: `No words for length ${wordLength}${isRepeat ? ' with repeated letters' : ''}` },
          { status: 400 }
        );
      }
      const targetWord = getRandomWord(words);
      gameState[gameKey] = {
        targetWord: targetWord,
        isGameWon: false
      };
      console.log("-------new target word set--------", targetWord);
    }

    const target = gameState[gameKey].targetWord;
    console.log("-------current target--------", target);

    const result = compare(target, userInput);
    console.log("-------comparison result--------", result);

    /*------------------- Check if game is won -------------------*/
    const isWon = result.every((status) => status === "correct");
    if (isWon) {
      gameState[gameKey].isGameWon = true;
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
