import data from "./words.json";
const allWords = data.targetWords;

/*------------------- get all the words based on target length -------------------*/
export const getWordsByLength = (length: number): string[] => {
  return allWords.filter((word) => word.length === length);
};

/*------------------- select a random word -------------------*/
export const getRandomWordByLength = (length: number): string => {
  const wordsOfLength = getWordsByLength(length);
  if (wordsOfLength.length === 0) {
    throw new Error(`No words found with length ${length}`);
  }
  const randomIndex = Math.floor(Math.random() * wordsOfLength.length);
  return wordsOfLength[randomIndex];
};

/*------------------- take all the letters from the word -------------------*/
export const getLettersFromWord = (word: string): string[] => {
  return word.split("");
};

/*------------------- word validation -------------------*/
export const isValidWord = (word: string): boolean => {
  return allWords.includes(word.toUpperCase());
};

/*------------------- export functions -------------------*/

/*------------------- test the functions -------------------*/
const testLength = 3;
const wordsWithLength = getWordsByLength(testLength);
const randomWord = getRandomWordByLength(testLength);
const wordLetters = getLettersFromWord(randomWord);

console.log("all the words is ", allWords);
console.log("all words based in selected length is ", wordsWithLength);
console.log("random word is ", randomWord);
console.log("target words letters is ", wordLetters);

// Letter comparison states
export type LetterState = "correct" | "present" | "absent";

export interface ComparisonResult {
  letterStates: LetterState[];
  isCorrect: boolean;
  correctCount: number;
  presentCount: number;
  absentCount: number;
}

export const compareWords = (guess: string, target: string): ComparisonResult => {
  const guessUpper = guess.toUpperCase();
  const targetUpper = target.toUpperCase();

  if (guessUpper.length !== targetUpper.length) {
    throw new Error("Guess and target must be same length");
  }

  const guessLetters = guessUpper.split("");
  const targetLetters = targetUpper.split("");
  const letterStates: LetterState[] = Array(guess.length).fill("absent");

  // Count target letter frequencies
  const targetFreq: { [key: string]: number } = {};
  targetLetters.forEach((letter) => {
    targetFreq[letter] = (targetFreq[letter] || 0) + 1;
  });

  // First pass: Mark correct positions (green)
  for (let i = 0; i < guessLetters.length; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      letterStates[i] = "correct";
      targetFreq[guessLetters[i]]--;
    }
  }

  // Second pass: Mark present letters (yellow)
  for (let i = 0; i < guessLetters.length; i++) {
    if (letterStates[i] === "absent") {
      const letter = guessLetters[i];
      if (targetFreq[letter] && targetFreq[letter] > 0) {
        letterStates[i] = "present";
        targetFreq[letter]--;
      }
    }
  }

  // Calculate statistics
  const correctCount = letterStates.filter((state) => state === "correct").length;
  const presentCount = letterStates.filter((state) => state === "present").length;
  const absentCount = letterStates.filter((state) => state === "absent").length;
  const isCorrect = correctCount === guess.length;

  return {
    letterStates,
    isCorrect,
    correctCount,
    presentCount,
    absentCount,
  };
};
