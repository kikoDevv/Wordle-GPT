"use client";
import { useState } from "react";
import { RiRestartLine, RiRestartFill } from "react-icons/ri";
import { IoLockClosed, IoLockOpen } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import DropDown from "@/components/buttons/dropDownMenu/dropDown";

export default function Home() {
  {/*--------- buttons state ----------*/}
  const [isRepeat, setRepeat] = useState(false);
  const [isCheating, setCheating] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const createNewGame = () => {
    setRotationDegree(prev => prev + 360);
  };

  return (
    <div className="grid w-full items-center justify-center">
      <div className="grid bg-amber-50">
        <input type="text" placeholder="Type your word here" />
        {/*--------- buttons section ----------*/}
        {/*---------repeat btn----------*/}
        <div className="flex px-10">
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
          <div className="flex">
            <button
              onClick={() => setCheating(!isCheating)}
              className="bg-neutral-700 pl-3 pr-1 py-1 text-white rounded-full hover:bg-neutral-600 cursor-pointer transition-all duration-300 text-center flex items-center gap-2 relative overflow-hidden">
              <p className="font-medium">Cheat</p>
              <div className="relative w-6 h-6 flex items-center justify-center">
                <IoLockClosed
                  className={`absolute text-xl text-red-400 transition-all duration-600 ease-out ${
                    isCheating ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-90 translate-x-1"
                  }`}
                />
                <IoLockOpen
                  className={`absolute text-xl text-green-400 transition-all duration-600 ease-out ${
                    isCheating ? "opacity-0 scale-90 -translate-x-1" : "opacity-100 scale-100 translate-x-0"
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
              onClick={() => createNewGame ()}
              className="bg-neutral-700 pl-3 pr-1 py-1 text-white rounded-full hover:bg-neutral-600 cursor-pointer transition-all duration-300 text-center flex items-center gap-2 relative overflow-hidden">
              <p className="font-medium">New game</p>
              <div className="relative w-6 h-6 flex items-center justify-center">
                <IoMdLogIn
                  className="text-xl text-green-400 transition-all duration-600 ease-out opacity-100 scale-100"
                  style={{ transform: `rotate(${rotationDegree}deg)` }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
