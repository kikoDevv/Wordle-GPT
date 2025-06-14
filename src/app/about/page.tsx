"use client";
import React, { useState, useEffect } from "react";
import { HiSparkles, HiLightBulb } from "react-icons/hi";
import { RiGamepadLine, RiPaletteLine, RiRocketLine } from "react-icons/ri";
import Dot from "@/components/dot/Dot";

export default function AboutPage() {
  const dotIntro = [
    "Welcome to about Wordle-GPT",
    "Reveal you skills",
    "Compare your score with others",
    "Dont be to hard on urself, try cheat mode",
    "Toggle between different word lenght",
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const totalAnimationTime = 7000;
    const timer = setTimeout(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % dotIntro.length);
      setKey((prev) => prev + 1);
    }, totalAnimationTime);

    return () => clearTimeout(timer);
  }, [currentMessageIndex, dotIntro.length]);
  return (
    <div className="grid w-full justify-center">
      {/*--------- About header section ----------*/}
      <section className="self-end mb-2 px-10">
        <div className="flex flex-col gap-2 w-full bg-neutral-600 rounded-t-2xl py-2">
          {/*--------- About dot UI ----------*/}
          <div className="flex w-full justify-center">
            <Dot
              key={key}
              text={dotIntro[currentMessageIndex]}
              dotColor="bg-white my-1"
              textColor="text-white text-lg font-semibold"
              speed={60}
              className="w-fit"
            />
          </div>
        </div>
      </section>

      {/*--------- main about section ----------*/}
      <div className="grid bg-neutral-600 p-6 rounded-3xl self-start max-w-4xl">
        {/*--------- Welcome message ----------*/}
        <div className="text-center mb-6">
          <p className="text-white text-lg leading-relaxed">
            A full-stack word puzzle game with MongoDB data persistence, server-side word validation, and customizable
            gameplay options.
          </p>
        </div>

        {/*--------- Features section ----------*/}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-neutral-800 p-4 rounded-2xl hover:bg-neutral-700 transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <RiGamepadLine className="text-green-400 text-xl" />
              <h3 className="text-white font-medium">Customizable Gameplay</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Choose word length, allow repeated letters, and toggle cheat mode to see the answer.
            </p>
          </div>

          <div className="bg-neutral-800 p-4 rounded-2xl hover:bg-neutral-700 transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <RiPaletteLine className="text-blue-400 text-xl" />
              <h3 className="text-white font-medium">Data Persistence</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Player stats, session duration, attempts, and completion times stored in MongoDB.
            </p>
          </div>

          <div className="bg-neutral-800 p-4 rounded-2xl hover:bg-neutral-700 transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <RiRocketLine className="text-purple-400 text-xl" />
              <h3 className="text-white font-medium">Secure Validation</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Word comparison logic runs server-side to prevent cheating and ensure fair gameplay.
            </p>
          </div>
        </div>

        {/*--------- Game features ----------*/}
        <div className="bg-neutral-800 p-4 rounded-2xl mb-6">
          <div className="flex items-center gap-2 mb-3">
            <HiLightBulb className="text-orange-400 text-xl" />
            <h3 className="text-white font-medium">Game Features & Data Tracking</h3>
          </div>
          <ul className="text-gray-300 space-y-2">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Variable word lengths (1-6 letters) with dropdown selection
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Repeat letters toggle - allow/disallow duplicate letters in words
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              Cheat mode - reveals the correct word for practice sessions
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              Player name storage and session tracking in MongoDB
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              Attempt counting and completion time measurement
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              Server-side word validation for enhanced security
            </li>
          </ul>
        </div>
        {/*--------- Footer message ----------*/}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <HiSparkles className="text-yellow-400" />
            <p className="text-white font-medium">Full-Stack Wordle with Database Persistence & Secure Validation</p>
            <HiSparkles className="text-yellow-400" />
          </div>
          <p className="text-gray-400 text-sm">© 2025 Wordle-GPT. Made with ❤️ by Kiko.devv@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
