"use client";
import { useState } from "react";
import { RiRestartLine, RiRestartFill } from "react-icons/ri";
import { IoLockClosed, IoLockOpen, IoSendSharp } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import DropDown from "@/components/buttons/dropDownMenu/dropDown";
import Dot from "@/components/dot/Dot";

export default function Home() {
  /*--------- buttons state ----------*/
  const [isRepeat, setRepeat] = useState(false);
  const [isCheating, setCheating] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const randomWordLenght = Math.floor(Math.random() * (6 - 2 + 1)) + 2;
  const [selectedWordLength, setSelectedWordLength] = useState(randomWordLenght);
  /*--------- game status ----------*/
  const [tryCont, setTryCount] = useState(0);

  /*--------- logic for random wordLenght ----------*/

  const handleWordLengthChange = (length: number) => {
    /*--------- Reset game state when word length changes ----------*/
    setUserInputs([]);
    setGuessResults([]);
    setIsGameWon(false);
    setTypingValue("");

    if (length === 0) {
      setSelectedWordLength(randomWordLenght);
      setDotSaying(`Length changed to random!`);
      setTryCount(0);
    } else {
      setSelectedWordLength(length);
      setDotSaying(`Length changed to ${length} Latters!`);
      setTryCount(0);
    }
    setDotColor("text-green-400");
    setDotKey((prev) => prev + 1);
  };

  /*--------- functions ----------*/
  const createNewGame = () => {
    setIsSpinning(true);
    setUserInputs([]);
    setGuessResults([]);
    setIsGameWon(false);
    setTypingValue("");
    setDotSaying("New game started!");
    setDotColor("text-green-400");
    setDotKey((prev) => prev + 1);

    setTimeout(() => {
      setIsSpinning(false);
    }, 2000);
  };

  /*--------- input value ----------*/
  const [userInputs, setUserInputs] = useState<string[]>([]);
  const [typingValue, setTypingValue] = useState("");
  const [guessResults, setGuessResults] = useState<string[][]>([]);
  const [isGameWon, setIsGameWon] = useState(false);

  //------------------Send user input and resive respons from backend-----------------
  const saveUserInput = async () => {
    if (typingValue.trim() !== "") {
      setUserInputs((prev) => [...prev, typingValue.trim()]);

      try {
        /*--------- guess/route ----------*/
        const res = await fetch("api/guess", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            userInput: typingValue.trim(),
            wordLengh: selectedWordLength,
            isRepeat: isRepeat,
            cheatMode: isCheating,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setDotColor("text-red-500");
          setDotSaying(data.error || "Something went wrong!");
          setDotKey((prev) => prev + 1);
          setUserInputs((prev) => prev.slice(0, -1));
          return;
        }

        /*--------- Received response from guess route ----------*/
        console.log("Client: Received validation from guess--->", data.feedback);

        // Store the feedback for this guess
        setGuessResults((prev) => [...prev, data.feedback]);

        /*--------- on game won ----------*/
        if (data.isWon) {
          setIsGameWon(true);
          setDotSaying(`🎉 Nicely done! You guessed the word: ${data.targetWord}`);
          setDotKey((prev) => prev + 1);

          /*--------- On game complete send data to db ----------*/
          fetch("api/db", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ trys: tryCont + 1 })
          });
        } else {
          setDotColor("text-white");
          setDotSaying("Wrong! Keep trying!");
          setDotKey((prev) => prev + 1);
          setTryCount(tryCont + 1);
        }
        if (data.cheatMessage !== undefined){
          setDotColor("text-red-700");
          setDotSaying(`${data.cheatMessage}`);
          setDotKey((prev) => prev + 1);
        }
      } catch (error) {
        console.error("Error submitting guess:", error);
        setDotSaying("Connection error! Please try again.");
        setDotColor("text-red-500");
        setDotKey((prev) => prev + 1);
        setUserInputs((prev) => prev.slice(0, -1));
      }

      setTypingValue("");
    }
  };
  /*--------- Dots proms logic ----------*/
  const [isDotSaying, setDotSaying] = useState("Welcome to Wordle-GPT");
  const [DotColor, setDotColor] = useState("text-white");
  const [dotKey, setDotKey] = useState(0);
  const dotPromp0 = () => {
    setDotSaying("Input connot be empty!");
    setDotColor("text-red-500");
    setDotKey((prev) => prev + 1);
  };
  const dotProm2 = () => {
    setDotColor("text-green-400");
    if (isRepeat) {
      setDotColor("text-white");
      setDotSaying("Repeated letters deactivated!");
      setTryCount(0);
    } else {
      setDotSaying("Repeated letters activated!");
      setTryCount(0);
    }
    setDotKey((prev) => prev + 1);
  };
  const dotProm3 = async () => {
    if (isCheating) {
      setDotColor("text-white");
      setDotSaying("Cheat mode deactivated!");
    } else {
      setDotColor("text-yellow-700");

      {/*--------- Immediately fetch and reveal the target word ----------*/}
      try {
        const res = await fetch("api/guess", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            userInput: "A".repeat(selectedWordLength),
            wordLengh: selectedWordLength,
            isRepeat: isRepeat,
            cheatMode: true,
          }),
        });

        const data = await res.json();
        if (data.cheatMessage) {
          setDotColor("text-red-700");
          setDotSaying(`${data.cheatMessage}`);
          setDotKey((prev) => prev + 1);
        }
      } catch (error) {
        console.error("Error fetching target word:", error);
      }
    }
  };
  const dotProm5 = () => {
    setTryCount(0);
    setDotSaying("New game is about to start!");
  };



  return (
    <div className="grid w-full justify-center">
      {/*--------- input value section ----------*/}
      <section className="self-end mb-1 px-10">
        <div className={`flex flex-col gap-2 w-full bg-neutral-600 rounded-t-2xl py-2`}>
          {/*--------- friendly dot UI ----------*/}
          <div className="flex w-full justify-center">
            <Dot
              key={dotKey}
              text={isDotSaying}
              dotColor="bg-white"
              textColor={`${DotColor} text-sm`}
              speed={20}
              className="w-fit"
            />
          </div>
          {userInputs.map((word, wordIndex) => (
            <div key={wordIndex} className="flex justify-center">
              {word.split("").map((letter, letterIndex) => {
                // Get the feedback for this guess and letter
                const feedback = guessResults[wordIndex]?.[letterIndex] || "absent";
                const bgColor =
                  feedback === "correct" ? "bg-green-600" : feedback === "present" ? "bg-yellow-600" : "bg-red-600";

                return (
                  letter.trim() !== "" && (
                    <h1
                      key={letterIndex}
                      className={`flex justify-center ml-0.5 items-center ${bgColor} text-white text-4xl w-10 h-10 rounded-md`}>
                      {letter}
                    </h1>
                  )
                );
              })}
            </div>
          ))}
        </div>
      </section>
      {/*--------- main box section ----------*/}
      <div className="grid bg-neutral-600 p-3 rounded-3xl self-start">
        <input
          type="text"
          placeholder="Type your word here"
          className="focus:outline-none border-none uppercase placeholder:normal-case"
          value={typingValue}
          disabled={isGameWon}
          onChange={(e) => {
            const newValue = e.target.value.toUpperCase();
            if (newValue.length <= selectedWordLength) {
              setTypingValue(newValue);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isGameWon) {
              if (typingValue.trim() !== "") {
                if (typingValue.length !== selectedWordLength) {
                  setDotSaying(`Please type ${selectedWordLength}letter!`);
                  setDotColor("text-yellow-700");
                  setDotKey((prev) => prev + 1);
                } else {
                  saveUserInput();
                }
              } else {
                dotPromp0();
              }
            }
          }}
        />
        {/*--------- lower container ----------*/}
        <div className="flex gap-20 mt-3">
          {/*--------- buttons container ----------*/}
          <section className="flex gap-1">
            {/*---------repeat btn----------*/}
            <div className="flex">
              <button
                onClick={() => {
                  setRepeat(!isRepeat);
                  // Reset game when repeat mode changes
                  setUserInputs([]);
                  setGuessResults([]);
                  setIsGameWon(false);
                  setTypingValue("");
                  dotProm2();
                }}
                className="bg-neutral-800 pl-3 pr-1 py-1 text-white rounded-full hover:bg-neutral-700 cursor-pointer transition-all duration-300 text-center flex items-center gap-2 relative overflow-hidden">
                <p className="font-medium">Repeat</p>
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <RiRestartFill
                    className={`absolute text-xl text-green-400 scale-130 transition-all duration-500 ease-in-out ${
                      isRepeat ? "opacity-100 scale-100 rotate-180" : "opacity-0 scale-75 rotate-0"
                    }`}
                  />
                  <RiRestartLine
                    className={`absolute text-xl text-gray-400 transition-all duration-500 ease-in-out ${
                      isRepeat ? "opacity-0 scale-75 -rotate-180" : "opacity-100 scale-100 rotate-0"
                    }`}
                  />
                </div>
              </button>
            </div>
            {/*---------cheat btn----------*/}
            <div className="flex">
              <button
                onClick={() => {
                  setCheating(!isCheating);
                  dotProm3();
                }}
                className="bg-neutral-800 pl-3 pr-1 py-1 text-white rounded-full hover:bg-neutral-700 cursor-pointer transition-all duration-300 text-center flex items-center gap-2 relative overflow-hidden">
                <p className="font-medium">Cheat</p>
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <IoLockOpen
                    className={`absolute text-xl transition-all text-green-400 duration-600 ease-out ${
                      isCheating ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-90 translate-x-1"
                    }`}
                  />
                  <IoLockClosed
                    className={`absolute text-xl transition-all duration-600 ease-out ${
                      isCheating ? "opacity-0 scale-90 -translate-x-1" : "opacity-100 scale-90 translate-x-0"
                    }`}
                  />
                </div>
              </button>
            </div>
            {/*---------drop down menu, wordlenght button-----------*/}
            <div className="relative w-24">
              <div className="absolute w-full">
                <DropDown onWordLengthChange={handleWordLengthChange} />
              </div>
            </div>
            {/*--------- new game button ----------*/}
            <div className="flex">
              <button
                onClick={() => {
                  createNewGame();
                  dotProm5();
                }}
                className="bg-neutral-800 pl-3 pr-1 py-1 text-white rounded-full hover:bg-neutral-700 cursor-pointer transition-all duration-300 text-center flex items-center gap-2 relative overflow-hidden">
                <p className="font-medium">New game</p>
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <IoMdLogIn
                    className={`text-xl text-green-400 transition-all ease-out opacity-100 scale-100 ${
                      isSpinning ? "animate-spin" : "duration-300"
                    }`}
                  />
                </div>
              </button>
            </div>
          </section>
          {/*--------- send button ----------*/}
          <button
            className={`px-2 py-2 rounded-full cursor-pointer transition-all duration-300 ${
              isGameWon
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-green-400 hover:scale-109 hover:text-amber-100"
            }`}
            disabled={isGameWon}
            onClick={() => {
              if (!isGameWon && typingValue.trim() !== "") {
                if (typingValue.length !== selectedWordLength) {
                  setDotSaying(`Type the all ${selectedWordLength} letter word!`);
                  setDotColor("text-orange-500");
                  setDotKey((prev) => prev + 1);
                } else {
                  saveUserInput();
                }
              } else if (!isGameWon) {
                dotPromp0();
              }
            }}>
            <IoSendSharp className="scale-140 rotate-270 hover:scale-150" />
          </button>
        </div>
      </div>
      <p className="fixed text-center text-xs text-gray-500 bottom-2 left-1/2 transform -translate-x-1/2">
        © 2025 KikoDevv. Inspired by ChatGPT UI. All rights reserved.
      </p>
    </div>
  );
}
