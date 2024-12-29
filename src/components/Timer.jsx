import React, { useState, useRef, useEffect } from "react";
import * as icons from "./Icons";
import { parseTime } from "../utils";

const STATE = {
  IDLE: "idle",
  COUNTING: "counting",
  PAUSED: "paused",
};

const Timer = () => {
  const [playing, setPlaying] = useState(false); // Whether the timer is running
  const [time, setTime] = useState(0); // The raw time in seconds
  const [parsedTime, setParsedTime] = useState("00:00:00"); // Formatted time
  const counterRef = useRef(null); // Store the interval reference

  function handleClick() {
    if (!playing) {
      setPlaying(true);
      if (!counterRef.current) {
        counterRef.current = setInterval(() => {
          setTime((prevTime) => {
            const newTime = prevTime + 1;
            setParsedTime(parseTime(newTime));
            return newTime;
          });
        }, 1000);
      }
    } else {
      setPlaying(false);
      clearInterval(counterRef.current);
      counterRef.current = null;
    }
  }

  useEffect(() => {
    // Cleanup interval when the component unmounts or when the timer is paused
    return () => {
      if (counterRef.current) {
        clearInterval(counterRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div className="h-80 w-80 rounded-full flex items-center justify-center border border-4 border-thirdbg text-swhite text-3xl">
        <h1>{parsedTime}</h1>
      </div>
      <button onClick={handleClick} className="h-10 w-40 rounded mt-10 bg-accent hover:bg-accenthover text-swhite font-regular">
          {playing ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default Timer;
