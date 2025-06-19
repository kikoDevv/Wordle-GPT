import data from "./words.json";
const allWords = data.targetWords;
/*------------------- compare each letter and return feedback -------------------*/
const compare = (selectedWord: string, guessedWord: string): string[] => {
  const selectedLetters = selectedWord.toUpperCase().split("");
  const guessedLetters = guessedWord.toUpperCase().split("");
  const result = [];

  // Check each letter
  for (let i = 0; i < guessedLetters.length; i++) {
    const guessLetter = guessedLetters[i];
    const selectedLetter = selectedLetters[i];

    if (guessLetter === selectedLetter) {
      // Letter is in correct position (green)
      result.push("correct");
    } else if (selectedLetters.includes(guessLetter)) {
      // Letter is in word but wrong position (yellow)
      result.push("misplaced");
    } else {
      // Letter is not in word (gray)
      result.push("wrogn");
    }
  }

  return result;
};


/*------------------- get words by lenghts -------------------*/
const getWordsByLength = (wordsLength: number, repeat: boolean): string[] => {
  if (repeat) {
    //Get only words that have repeated letters
    const wordsWithRepeatedLetters = allWords.filter((word) => {
      const letters = word.split("");
      const uniqueLetters = new Set(letters);
      return letters.length !== uniqueLetters.size;
    });

    //Filter those words by length
    return wordsWithRepeatedLetters.filter((word) => word.length === wordsLength);
  } else {
    //Only get words that match the length
    return allWords.filter((word) => word.length === wordsLength);
  }
};
/*------------------- get a random word and return word latters -------------------*/
const getRandomWord = (words: string[]): string[] => {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex].split("");
};
