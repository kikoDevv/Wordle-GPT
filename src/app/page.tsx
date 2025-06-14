"use client";
import { useState } from "react";
import { RiRestartLine, RiRestartFill } from "react-icons/ri";

export default function Home() {
  const [isRepeat, setRepeat] = useState(false);

  return (
    <div className="flex w-full items-center justify-center bg-amber-400">
      <div className="bg-amber-50">
        <input type="text" placeholder="Type your word here" />
        {/*--------- buttons section ----------*/}
				{/*---------Repeat btn----------*/}
        <div className="flex">
          <button
            onClick={() => setRepeat(!isRepeat)}
            className="bg-neutral-700 pl-3 pr-1 py-1 text-white rounded-full hover:bg-neutral-600 cursor-pointer transition-all duration-300 text-center flex items-center gap-2 relative overflow-hidden">
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
				
      </div>
    </div>
  );
}
