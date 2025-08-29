import React, { useState } from "react";

function App() {
  const [turn, setTurn] = useState(1);
  const [word, setWord] = useState("");
  const [history, setHistory] = useState([]);
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [timer, setTimer] = useState(30);

  return (
    <div className="w-[100%] min-h-screen flex items-center justify-center bg-purple-500 p-8">
      <div className="bg-gray-100 shadow-2xl rounded-3xl p-8 w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600 underline">
          SHIRITORI GAME
        </h1>

        {/* Player 1 */}
        <div className="flex justify-between items-center mb-6">
          <div
          // className={`p-4 rounded-xl text-center w-40 ${
          //   turn === 1
          //     ? "bg-indigo-100 border-2 border-indigo-500"
          //     : "bg-gray-100"
          // }`}
          >
            <h2 className="font-bold text-lg text-gray-800">Player 1</h2>
            <p className="text-2xl font-extrabold text-blue-600">
              {/* {scores.p1} */}
              p1
            </p>
          </div>

          {/* Time */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">Time Left</p>
            <p
            // className={`text-3xl font-bold ${
            //   timer <= 3 ? "text-red-500" : "text-green-600"
            // }`}
            >
              {/* {timer}s */}
              8s
            </p>
          </div>

          {/* player 2 */}
          <div
          // className={`p-4 rounded-xl text-center w-40 ${
          //   turn === 2
          //     ? "bg-pink-100 border-2 border-pink-500"
          //     : "bg-gray-100"
          // }`}
          >
            <h2 className="font-bold text-lg text-gray-800">Player 2</h2>
            <p className="text-2xl font-extrabold text-pink-600">
              {/* {scores.p2} */}
              p2
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
