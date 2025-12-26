"use client";
import { useState } from "react";

interface Matched {
  index: number;
  value: number;
}

const Home = () => {
  const initialValue = [2, 2, 3, 5, 1, 2, 3, 4, 2, 3, 4, 5];
  const [matched, setMatched] = useState<Matched[]>([]);
  const [cleared, setCleared] = useState<number[]>([]);

  const flipBox = (clicked: Matched) => {
    if (cleared.includes(clicked.index)) return;
    let next = [...matched, clicked];
    if (next.length > 2) next = [clicked];
    setMatched(next);

    if (next.length === 2) {
      const [a, b] = next;
      if (a.value === b.value) {
        setTimeout(() => {
          setCleared((prev) => [...prev, a.index, b.index]);
        }, 300);
      }
      setTimeout(() => setMatched([]), 500);
    }
  };

  const reset = () => {
    setMatched([]);
    setCleared([]);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="text-center border-2 border-green-600 rounded-xl shadow-lg bg-white mt-10 p-6 w-[420px]">
        <h1 className="text-2xl font-semibold mb-5 text-green-700">Memory Match Game</h1>

        <div className="grid grid-cols-4 gap-3 justify-center">
          {initialValue.map((item, index) => {
            const isCleared = cleared.includes(index);
            const isShown = matched.find((m) => m.index === index);

            return (
              <button
                key={index}
                disabled={isCleared}
                onClick={() => flipBox({ index, value: item })}
                className={`
                  w-16 h-16 rounded-md text-xl font-bold transition-all duration-200
                  border border-gray-400
                  ${isCleared ? "opacity-0 pointer-events-none" : "bg-yellow-300 text-red-700 hover:scale-105"}
                `}
              >
                {isShown ? item : ""}
              </button>
            );
          })}
        </div>

        <button
          className="px-6 py-2 mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-md transition"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Home;
