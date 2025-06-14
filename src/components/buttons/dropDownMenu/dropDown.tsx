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
        className="bg-neutral-800 text-white font-medium rounded-full px-3 py-1 cursor-pointer hover:bg-neutral-700"
        onClick={() => setDropDownOpen(!isDropDownOpen)}>
        {wordLength === 0 ? (
          <div className="flex items-center gap-1">
            {" "}
            <p>Lengh</p> <PiShuffle />
          </div>
        ) : (
          `Length: ${wordLength}`
        )}
      </button>
      <div
        className={`absolute top-full mt-1 rounded-xl shadow-lg z-10 min-w-full bg-neutral-900 px-1 overflow-hidden transition-all duration-300 ease-out ${
          isDropDownOpen ? "opacity-100 scale-100 translate-y-0 max-h-96" : "opacity-0 scale-95 -translate-y-2 max-h-0"
        }`}>
        <ul className={`grid py-2 transition-all duration-200 ${isDropDownOpen ? "translate-y-0" : "-translate-y-4"}`}>
          <li>
            <button
              className="cursor-pointer hover:bg-neutral-600 w-full rounded-md py-2 bg-neutral-700 transition-colors"
              onClick={() => handleWordLengthSelect(0)}>
              <PiShuffle />
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer hover:bg-neutral-600 w-full rounded-md py-1 bg-neutral-700 transition-colors"
              onClick={() => handleWordLengthSelect(1)}>
              1
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer hover:bg-neutral-600 w-full rounded-md py-1 bg-neutral-700 transition-colors"
              onClick={() => handleWordLengthSelect(2)}>
              2
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer hover:bg-neutral-600 w-full rounded-md py-1 bg-neutral-700 transition-colors"
              onClick={() => handleWordLengthSelect(3)}>
              3
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer hover:bg-neutral-600 w-full rounded-md py-1 bg-neutral-700 transition-colors"
              onClick={() => handleWordLengthSelect(4)}>
              4
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer hover:bg-neutral-600 w-full rounded-md py-1 bg-neutral-700 transition-colors"
              onClick={() => handleWordLengthSelect(5)}>
              5
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer hover:bg-neutral-600 w-full rounded-md py-1 bg-neutral-700 transition-colors"
              onClick={() => handleWordLengthSelect(6)}>
              6
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
