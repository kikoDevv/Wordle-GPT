"use client";
import React, { useState, useEffect } from "react";
import Dot from "@/components/dot/Dot";
import { FaChartBar } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";

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

  return (
    <div className="flex items-center justify-center w-full text-white select-none">
      <div className="grid">
        {/*--------- header dot section ----------*/}
        <section className="flex justify-center bg-neutral-700 p-2 mb-1 rounded-t-2xl ml-10 mr-10">
          <Dot text="Welcome to leader board" dotColor="bg-white" textColor="text-xs" speed={50} />
        </section>
        {/*--------- main logo section ----------*/}
        <section className="grid bg-neutral-700 rounded-4xl p-7">
          <div className="mb-6">
            <p>Welcome to the leader board section where you can see and compare you scores with others</p>
          </div>
          <div className="flex justify-between mb-10">
            <div className="flex items-center gap-2 bg-neutral-900 px-5 py-2 rounded-xl">
              <FaChartBar />
              <p>Compare you score</p>
            </div>
            <div className="flex items-center gap-2 bg-neutral-900 px-5 py-2 rounded-xl">
              <FaUsers />
              <p>See others score</p>
            </div>
            <div className="flex items-center gap-2 bg-neutral-900 px-5 py-2 rounded-xl">
              <FaTrophy />
              <p>Compite against others</p>
            </div>
          </div>
          {/*--------- body data section ----------*/}
          <section className="grid">
            {loading ? (
              <p>Loading games...</p>
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4 justify-self-center flex items-center gap-2">
                  <FaTrophy
                  className="text-amber-400"/>
                  Game Results
                </h2>
                {games.length === 0 ? (
                  <p>No games played yet!</p>
                ) : (
                  <div className="grid gap-3">
                    {games.map((game, index) => (
                      <div key={game._id} className="bg-neutral-800 p-4 rounded-lg flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <span className="text-yellow-400 font-bold">#{index + 1}</span>
                          <span className="font-semibold">{game.userName}</span>
                        </div>
                        <div className="flex gap-6 text-sm">
                          <span>
                            Word: <span className="text-green-400">{game.targetWord}</span>
                          </span>
                          <span>
                            Length: <span className="text-blue-400">{game.wordLength}</span>
                          </span>
                          <span>
                            Tries: <span className="text-red-400">{game.trys}</span>
                          </span>
                          <span>
                            Repeat: <span className="text-purple-400">{game.unique ? "On" : "Off"}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        </section>
      </div>
    </div>
  );
}
