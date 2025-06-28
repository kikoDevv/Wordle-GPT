"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Dot from "@/components/dot/Dot";
import { FaChartBar } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa";

interface GameData {
  _id: string;
  userName: string;
  targetWord: string;
  wordLength: number;
  unique: boolean;
  trys: number;
  createdAt: string;
  updatedAt: string;
}

export default function LeaderBoard() {
  const [games, setGames] = useState<GameData[]>([]);
  const [loading, setLoading] = useState(true);
  const [dotTextIndex, setDotTextIndex] = useState(0);

  const dotTexts = [
    "🏆 Welcome to the Leaderboard",
    "📊 Compare your scores with others",
    "🎯 See who has the best performance",
    "🥇 Top players showcase their skills",
    "📈 Track your ranking progress",
    "🎮 Challenge yourself to climb higher",
  ];

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("/api/db");
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotTextIndex((prev) => (prev + 1) % dotTexts.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [dotTexts.length]);

  return (
    <div className="grid w-full justify-center">
      {/*--------- header dot section ----------*/}
      <section className="self-end mb-1 px-10">
        <div className="flex flex-col gap-2 w-full bg-neutral-600 rounded-t-2xl py-2">
          <div className="flex w-full justify-center">
            <Dot
              key={dotTextIndex}
              text={dotTexts[dotTextIndex]}
              dotColor="bg-white"
              textColor="text-white text-sm"
              speed={50}
              className="w-fit"
            />
          </div>
        </div>
      </section>
      {/*--------- main container ----------*/}
      <div className="grid bg-neutral-600 p-6 rounded-3xl self-start max-w-4xl">
        {/*--------- Welcome message ----------*/}
        <div className="text-center mb-6">
          <p className="text-white text-lg leading-relaxed">
            Welcome to the leaderboard section where you can see and compare your scores with others
          </p>
        </div>

        {/*--------- Features section ----------*/}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-neutral-800 p-4 rounded-2xl hover:bg-neutral-700 transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <FaChartBar className="text-green-400 text-xl" />
              <h3 className="text-white font-medium">Compare Scores</h3>
            </div>
            <p className="text-gray-300 text-sm">See how your performance stacks up against other players.</p>
          </div>

          <div className="bg-neutral-800 p-4 rounded-2xl hover:bg-neutral-700 transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <FaUsers className="text-blue-400 text-xl" />
              <h3 className="text-white font-medium">Player Stats</h3>
            </div>
            <p className="text-gray-300 text-sm">View detailed statistics and attempts from all players.</p>
          </div>

          <div className="bg-neutral-800 p-4 rounded-2xl hover:bg-neutral-700 transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <FaTrophy className="text-purple-400 text-xl" />
              <h3 className="text-white font-medium">Compete</h3>
            </div>
            <p className="text-gray-300 text-sm">Challenge yourself to achieve better scores and climb higher.</p>
          </div>
        </div>
        {/*--------- Game Results section ----------*/}
        <div className="bg-neutral-800 p-4 rounded-2xl mb-6">
          {loading ? (
            <p className="text-white">Loading games...</p>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4 justify-self-center flex items-center gap-2 text-white">
                <FaTrophy className="text-amber-400" />
                Game Results
              </h2>
              {games.length === 0 ? (
                <p className="text-white">No games played yet!</p>
              ) : (
                <div className="grid gap-3">
                  {games.map((game, index) => {
                    const isTop3 = index < 3;
                    const rankColors = ["text-yellow-400", "text-gray-300", "text-orange-400"];
                    const rankColor = isTop3 ? rankColors[index] : "text-cyan-400";

                    return (
                      <div
                        key={game._id}
                        className={`${
                          isTop3
                            ? "bg-gradient-to-r from-neutral-700 to-neutral-800 border border-neutral-600"
                            : "bg-neutral-700"
                        } py-4 px-7 rounded-lg flex justify-between items-center hover:bg-neutral-600 transition-all duration-300`}>
                        <div className="flex items-center gap-4">
                          <span className={`${rankColor} font-bold text-lg`}>
                            {index < 3 ? ["🥇", "🥈", "🥉"][index] : `#${index + 1}`}
                          </span>
                          <span className="font-semibold text-white">{game.userName}</span>
                        </div>
                        <div className="flex gap-6 text-sm">
                          <span className="text-gray-300">
                            Word: <span className="text-green-400">{game.targetWord}</span>
                          </span>
                          <span className="text-gray-300">
                            Length: <span className="text-blue-400">{game.wordLength}</span>
                          </span>
                          <span className="text-gray-300">
                            Tries: <span className="text-red-400">{game.trys}</span>
                          </span>
                          <span className="text-gray-300">
                            Repeat: <span className="text-purple-400">{game.unique ? "On" : "Off"}</span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
        {/*--------- Footer message ----------*/}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaTrophy className="text-amber-400" />
            <p className="text-white font-medium">Keep playing to climb the leaderboard!</p>
          </div>

          {/*--------- action buttons ----------*/}
          <div className="flex gap-4 justify-center mb-4">
            <Link href="/">
              <button className="bg-neutral-800 pl-3 pr-1 py-1 text-white rounded-full hover:bg-neutral-700 cursor-pointer transition-all duration-300 text-center flex items-center gap-2 relative overflow-hidden">
                <p className="font-medium">Play Game</p>
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <FaPlay className="text-green-400 text-sm" />
                </div>
              </button>
            </Link>
            <Link href="/myOther">
              <button className="bg-neutral-800 pl-3 pr-1 py-1 text-white rounded-full hover:bg-neutral-700 cursor-pointer transition-all duration-300 text-center flex items-center gap-2 relative overflow-hidden">
                <p className="font-medium">My Other Projects</p>
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <FaFolderOpen className="text-blue-400 text-sm" />
                </div>
              </button>
            </Link>
          </div>

          <p className="text-gray-400 text-sm">© 2025 Wordle-GPT. Made with ❤️ by Kiko.devv@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
