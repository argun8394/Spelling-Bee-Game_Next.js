"use client";
import React, { useEffect, useState } from "react";
import style from "./game.module.css";
import wordList from "@/data/data";
import axios from "axios";
import WordCheck from "../wordCheck/WordCheck";

const Game = () => {
  const [newWord, setNewWord] = useState("");
  const [createdWord, setCreatedWord] = useState("");
  const [clickedIndices, setClickedIndices] = useState([]);

  const getRandomWord = async () => {
    try {
      const { data } = await axios.get("/api/game");
      return data[0];
    } catch (error) {
      console.error("Error fetching random word:", error);
      return "";
    }
  };

  const shuffleWord = async () => {
    // const randomWordIndex = Math.floor(Math.random() * wordList.length);
    // const word = wordList[randomWordIndex];
    const word = await getRandomWord();
    if (!word) return;

    const letters = word.split("");
    const shuffledLetters = [];
    console.log(word);

    while (letters.length > 0) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      const randomLetter = letters.splice(randomIndex, 1)[0];
      shuffledLetters.push(randomLetter);
    }

    const shuffledWord = shuffledLetters.join("");
    setClickedIndices([]);
    setCreatedWord("");

    setNewWord(shuffledWord);
  };

  const handleCreateWord = (letter, index) => {
    setCreatedWord((prev) => prev + letter);
    setClickedIndices((prev) => [...prev, index]);
    console.log(createdWord);
  };

  const Clear = () => {
    setClickedIndices([]);
    setCreatedWord("");
  };

  useEffect(() => {
    shuffleWord();
  }, []);

  return (
    <div className={style.container}>
      <div className="flex">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => Clear()}
        >
          Clear
        </button>
        <WordCheck
          newWord={newWord}
          createdWord={createdWord}
          setCreatedWord={setCreatedWord}
          setClickedIndices={setClickedIndices}
        />
      </div>
      <div className="flex gap-4">
        {[...Array(7).keys()].map((i) => (
          <div key={i}>
            <div>
              <button
                className="flex justify-center items-center uppercase font-[700] text-2xl text-black bg-white w-7 h-7 rounded-sm"
                style={{
                  backgroundColor: clickedIndices.includes(i) ? "red" : "white",
                }}
                onClick={() => handleCreateWord(newWord[i], i)}
                disabled={clickedIndices.includes(i)}
              >
                {newWord[i]}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => shuffleWord()}
        >
          Next Word
        </button>
      </div>
    </div>
  );
};

export default Game;
