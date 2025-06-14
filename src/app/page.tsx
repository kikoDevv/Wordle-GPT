"use client";
import { useState } from "react";
import { RiRestartLine, RiRestartFill } from "react-icons/ri";
import { IoLockClosed, IoLockOpen, IoSendSharp } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import DropDown from "@/components/buttons/dropDownMenu/dropDown";
import Dot from "@/components/dot/Dot";

export default function Home() {
  {
    /*--------- buttons state ----------*/
  }
  const [isRepeat, setRepeat] = useState(false);
  const [isCheating, setCheating] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  {
    /*--------- functions ----------*/
  }
  const createNewGame = () => {
    setIsSpinning(true); // Start continuous spinning
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };
  {
    /*--------- input value ----------*/
  }
  const [userInputs, setUserInputs] = useState<string[]>([]);
  const [typingValue, setTypingValue] = useState("");

  const saveUserInput = () => {
    if (typingValue.trim() !== "") {
      setUserInputs((prev) => [...prev, typingValue.trim()]);
      setTypingValue("");
    }
  };

  {
    /*--------- Dots proms logic ----------*/
  }
  const [isDotSaying, setDotSaying] = useState("Welcome to Wordle-GPT");
  const [DotColor, setDotColor] = useState("text-white");
  const [dotKey, setDotKey] = useState(0);
  const dotPromp0 = () => {
    setDotSaying("Input connot be empty!");
    setDotColor("text-red-500");
    setDotKey((prev) => prev + 1);
  };
  const dotPromp1 = () => {
    setDotSaying("The game is on!");
    setDotColor("text-white");
    setDotKey((prev) => prev + 1);
  };
  const dotProm2 = () => {
    setDotColor("text-yellow-300");
    if (isRepeat) {
      setDotSaying("Repeated letter deactivated");
    } else {
      setDotSaying("Repeated letter activated!");
    }
  };
  const dotProm3 = () => {
    if (isCheating) {
      setDotSaying("Cheat mode deactivated!");
    } else {
      setDotSaying("You nasty, Cheat mode activated!");
    }
  };
  const dotProm5 = () => {
    setDotSaying("New game is about to start!");
  };

  return (
    <div className="grid w-full justify-center">
      {/*--------- input value section ----------*/}
      <section className="self-end mb-2 px-10">
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
              {word.split("").map(
                (letter, letterIndex) =>
                  letter.trim() !== "" && (
                    <h1
                      key={letterIndex}
                      className="flex justify-center ml-0.5 items-center bg-red-600 text-white text-4xl w-10 h-10 rounded-md">
                      {letter}
                    </h1>
                  )
              )}
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
          onChange={(e) => setTypingValue(e.target.value.toUpperCase())}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (typingValue.trim() !== "") {
                saveUserInput();
                dotPromp1();
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
            {/*---------drop down menu, wordlenght button----------*/}
            <div className="relative w-24">
              <div className="absolute w-full">
                <DropDown />
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
            className="bg-white px-2 py-2 rounded-full cursor-pointer hover:bg-green-400 hover:scale-109 hover:text-amber-100 transition-all duration-300"
            onClick={() => {
              if (typingValue.trim() !== "") {
                saveUserInput();
                dotPromp1();
              } else {
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
