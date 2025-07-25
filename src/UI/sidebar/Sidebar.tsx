"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IoGameController, IoTrophy, IoInformationCircle, IoFolder, IoGrid } from "react-icons/io5";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/*--------- condition ----------*/}
      <div
        className={`bg-neutral-900 h-dvh flex flex-col transition-all duration-500 ease-in-out shadow-1xl shadow-black/50 ${
          isOpen ? "translate-x-0 w-68" : "w-0 -translate-x-full"
        } overflow-hidden`}>
        <div className={`w-60 h-full flex flex-col${!isOpen ? " hidden" : ""}`}>
          {/*--------- slider head ----------*/}
          <div className="flex items-center p-5 select-none">
            <IoGrid className="mr-3 text-xl text-blue-400" />
            <h1 className="text-white font-semibold">Wordle-GPT</h1>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-auto p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200 text-gray-400 hover:text-white hover:cursor-pointer"
              title="Close sidebar">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/*--------- slider body ----------*/}
          <ul className="grid py-5">
            <li className="hover:bg-gray-800 hover:cursor-pointer pl-5 py-2 rounded-sm flex items-center text-gray-300 hover:text-white transition-colors">
              <Link href="/" className="flex items-center w-full" onClick={() => setIsOpen(false)}>
                <IoGameController className="mr-3 text-lg" />
                Play
              </Link>
            </li>
            <li className="hover:bg-gray-800 hover:cursor-pointer pl-5 py-2 rounded-sm flex items-center text-gray-300 hover:text-white transition-colors">
              <Link href="/leaderBoard" className="flex items-center w-full" onClick={() => setIsOpen(false)}>
                <IoTrophy className="mr-3 text-lg" />
                Leader board
              </Link>
            </li>
            <li className="hover:bg-gray-800 hover:cursor-pointer pl-5 py-2 rounded-sm flex items-center text-gray-300 hover:text-white transition-colors">
              <Link href="/about" className="flex items-center w-full" onClick={() => setIsOpen(false)}>
                <IoInformationCircle className="mr-3 text-lg" />
                About
              </Link>
            </li>
            <li className="hover:bg-gray-800 hover:cursor-pointer pl-5 py-2 rounded-sm flex items-center text-gray-300 hover:text-white transition-colors">
              <Link href="/myOther" className="flex items-center w-full" onClick={() => setIsOpen(false)}>
                <IoFolder className="mr-3 text-lg" />
                My other projects
              </Link>
            </li>
          </ul>
          {/*--------- slider foot ----------*/}
          <div className="flex justify-center mt-auto p-5 border-t border-gray-700">
            <p className="text-gray-500 text-sm">Version 2.0</p>
          </div>
        </div>
      </div>

      {/*--------- sidebar button in home ----------*/}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-8 left-8 z-50 ${
          isOpen
            ? "opacity-0 scale-10 transition-all duration-200 ease-in-out"
            : "opacity-100 hover:cursor-pointer scale-150 transition-all duration-900 ease-in-out"
        }`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.75 6C2.75 4.20508 4.20508 2.75 6 2.75H18C19.7949 2.75 21.25 4.20508 21.25 6V18C21.25 19.7949 19.7949 21.25 18 21.25H6C4.20508 21.25 2.75 19.7949 2.75 18V6Z"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M8.75 21.25V2.75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  );
}
