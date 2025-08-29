import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [turn, setTurn] = useState(1);
  const [word, setWord] = useState("");
  const [history, setHistory] = useState([]);
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [timer, setTimer] = useState(30);

  // Time count ------------------------------------>>
  useEffect(() => {
    if (timer === 0) {
      handleInvalidWord("timeout");
      return;
    }
    const interval = setInterval(() => setTimer((time) => time - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Word check with given API --------------------->>
  const checkWord = async () => {
    try {
      const res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      return res.status === 200;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const switchTurn = () => {
    setTurn(turn === 1 ? 2 : 1);
    setWord("");
    setTimer(30);
  };

  // Invalid word ----------------------->>
  const handleInvalidWord = () => {
    setScores({
      ...scores,
      [turn === 1 ? "p1" : "p2"]: scores[turn === 1 ? "p1" : "p2"] - 1,
    });
    switchTurn();
  };

  // Submit -------------------------------->>
  const handleSubmit = async () => {
    if (word.length < 4)
      return handleInvalidWord("Write the more than 3 word.");
    if (history.includes(word)) return handleInvalidWord("Repeated");
    if (history.length > 0) {
      const last = history[history.length - 1];
      if (word[0].toLowerCase() !== last[last.length - 1].toLowerCase()) {
        return handleInvalidWord("wrong start letter");
      }
    }

    const isValid = await checkWord(word);
    if (!isValid) {
      handleInvalidWord();
    }

    setHistory([...history, word]);
    setScores({
      ...scores,
      [turn === 1 ? "p1" : "p2"]: scores[turn === 1 ? "p1" : "p2"] + 1,
    });
    switchTurn();
  };

  return (
    <div className="w-[100%] min-h-screen flex flex-col items-center justify-center bg-purple-500 p-8">
      <h1 className="text-5xl font-bold text-indigo-900 mb-6">
        Tonmoy Sutradhr
      </h1>
      <div className="bg-gray-100 shadow-2xl rounded-3xl p-8 lg:w-[50%] md:w-[50%]">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600 underline">
          SHIRITORI GAME
        </h1>

        {/* -------------------------Player 1----------------------------- */}
        <div className="flex justify-between items-center mb-6">
          <div
            className={`p-4 rounded-xl text-center w-40 ${
              turn === 1
                ? "bg-indigo-100 border-2 border-indigo-500"
                : "bg-gray-100"
            }`}
          >
            <h2 className="font-bold text-lg text-gray-800">Player 1</h2>
            <p className="text-2xl font-extrabold text-blue-600">{scores.p1}</p>
          </div>

          {/* Time */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">Time Left</p>
            <p className={"text-3xl font-bold "}>{timer}s</p>
          </div>

          {/* player 2 */}
          <div
            className={`p-4 rounded-xl text-center w-40 ${
              turn === 2
                ? "bg-pink-100 border-2 border-pink-500"
                : "bg-gray-100"
            }`}
          >
            <h2 className="font-bold text-lg text-gray-800">Player 2</h2>
            <p className="text-2xl font-extrabold text-pink-600">{scores.p2}</p>
          </div>
        </div>

        {/* -----------------------Input filed----------------------------- */}
        <div className="flex gap-2 mb-6">
          <input
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter your word"
            className="flex-grow px-4 py-3 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-2xl"
          >
            Submit
          </button>
        </div>

        {/* -----------------------Player word history -----------------------*/}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            Word History
          </h3>
          <div className="bg-gray-100 rounded-lg p-4 h-40 overflow-y-auto shadow-inner">
            <ul className="space-y-1">
              {history.length === 0 && (
                <p className="text-gray-500 text-sm">No words yet...</p>
              )}
              {history.map((word, index) => (
                <li
                  key={index}
                  className="px-3 py-2 bg-white rounded-md shadow-sm border text-gray-700"
                >
                  {index + 1}. {word}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
