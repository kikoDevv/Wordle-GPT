import React, { useState } from "react";
import { PiShuffle } from "react-icons/pi";

export default function DropDown() {
  const [isDropDownOpen, setDropDownOpen] = useState(false);
  const [wordLength, setWordLength] = useState(0);

  const handleWordLengthSelect = (length: number) => {
    setWordLength(length);
    setDropDownOpen(false);
  };

  return (
    <div className="grid relative">
      <button
        className="bg-neutral-700 text-white font-medium rounded-full px-3 py-1"
        onClick={() => setDropDownOpen(!isDropDownOpen)}>
        {wordLength === 0 ? <div className="flex items-center gap-1"> <p>Lengh</p> <PiShuffle/></div> : `Length: ${wordLength}`}
      </button>
      {isDropDownOpen && (
        <ul className="grid bg-blue-500 absolute top-full mt-1 rounded-md shadow-lg z-10 min-w-full">
          <li>
            <button
              className="cursor-pointer bg-yellow-400 w-full rounded-md p-2 hover:bg-yellow-300 transition-colors"
              onClick={() => handleWordLengthSelect(0)}>
              <PiShuffle />
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer bg-yellow-400 w-full rounded-md p-2 hover:bg-yellow-300 transition-colors"
              onClick={() => handleWordLengthSelect(1)}>
              1
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer bg-yellow-400 w-full rounded-md p-2 hover:bg-yellow-300 transition-colors"
              onClick={() => handleWordLengthSelect(2)}>
              2
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer bg-yellow-400 w-full rounded-md p-2 hover:bg-yellow-300 transition-colors"
              onClick={() => handleWordLengthSelect(3)}>
              3
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer bg-yellow-400 w-full rounded-md p-2 hover:bg-yellow-300 transition-colors"
              onClick={() => handleWordLengthSelect(4)}>
              4
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer bg-yellow-400 w-full rounded-md p-2 hover:bg-yellow-300 transition-colors"
              onClick={() => handleWordLengthSelect(5)}>
              5
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer bg-yellow-400 w-full rounded-md p-2 hover:bg-yellow-300 transition-colors"
              onClick={() => handleWordLengthSelect(6)}>
              6
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
