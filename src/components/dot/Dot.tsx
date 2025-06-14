"use client";
import React, { useState, useEffect } from "react";

interface DotProps {
  text: string;
  speed?: number;
  dotColor?: string;
  textColor?: string;
  className?: string;
  pauseDuration?: number;
}

export default function Dot({
  text,
  speed = 100,
  dotColor = "bg-blue-500",
  textColor = "text-gray-800",
  className = "",
  pauseDuration = 2000,
}: DotProps) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [isRevealing, setIsRevealing] = useState(true);

  useEffect(() => {
    if (isRevealing && revealedCount < text.length) {
      {/*--------- Revealing phase ----------*/}
      const timer = setTimeout(() => {
        setRevealedCount((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (isRevealing && revealedCount === text.length) {
      {/*--------- Pause phase ----------*/}
      const pauseTimer = setTimeout(() => {
        setIsRevealing(false);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    } else if (!isRevealing && revealedCount > 0) {
      {/*--------- Unrevealing phase ----------*/}
      const timer = setTimeout(() => {
        setRevealedCount((prev) => prev - 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [revealedCount, isRevealing, text.length, speed, pauseDuration]);

  {/*--------- Reset animation when text changes ----------*/}
  useEffect(() => {
    setRevealedCount(0);
    setIsRevealing(true);
  }, [text]);

  return (
    <div className={`flex items-center ${className}`}>
      <span className={`${textColor} font-mono`}>{text.slice(0, revealedCount)}</span>
      <span className={`w-4 h-4 ${dotColor} rounded-full ml-1 animate-pulse`} />
    </div>
  );
}
