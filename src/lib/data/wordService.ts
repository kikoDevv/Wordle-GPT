import data from "./words.json";
const allWords = data.targetWords;
/*------------------- compare each latter and return feedback -------------------*/



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
