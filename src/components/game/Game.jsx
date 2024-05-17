"use client";
import React, { useEffect, useState } from "react";
import style from "./game.module.css";
import { positions } from "@/data/data";
import axios from "axios";
import WordCheck from "../wordCheck/WordCheck";
import GameOver from "../gameOver/GameOver";

const Game = () => {
  const [newWord, setNewWord] = useState("");
  const [createdWord, setCreatedWord] = useState("");
  const [clickedIndices, setClickedIndices] = useState([]);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState("");
  const [wordList, setWordList] = useState([]);

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

  const Delete = () => {
    setClickedIndices([]);
    setCreatedWord("");
    setError("");
  };

  useEffect(() => {
    shuffleWord();
  }, []);

  return (
    <div className={style.container}>
      {10 > 0 ? (
        <div className="flex flex-col gap-10">
          <div className="flex justify-center items-end ">
            <WordCheck
              newWord={newWord}
              createdWord={createdWord}
              setCreatedWord={setCreatedWord}
              setClickedIndices={setClickedIndices}
              timer={timer}
              setTimer={setTimer}
              error={error}
              setError={setError}
              wordList={wordList}
              setWordList={setWordList}
            />
            <button
              className="h-8 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 
              font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 
              focus:outline-none dark:focus:ring-red-800"
              onClick={() => Delete()}
            >
              Delete
            </button>
          </div>
          <div className="flex">
            <div className=" relative w-[340px] h-[250px] ">
              {newWord.split("").map((letter, i) => (
                <button
                  key={i}
                  className={`absolute ${positions[i].x} w-[84px] h-[40px]
                bg-transparent flex justify-center 
                items-center before:absolute before:top-[-30px] before:w-0 before:h-0 
                before:border-b-[30px] ${
                  clickedIndices.includes(i)
                    ? "before:border-b-[#ffbf00]"
                    : "before:border-b-[#27aae1]"
                } before:border-l-[42px] 
                before:border-l-transparent before:border-r-[40px] before:border-r-transparent after:absolute 
                after:bottom-[-30px] after:w-0 after:border-t-[30px] ${
                  clickedIndices.includes(i)
                    ? "after:border-t-[#ffbf00]"
                    : "after:border-t-[#27aae1]"
                }  after:border-l-[42px] 
                after:border-l-transparent after:border-r-[42px] after:border-r-transparent`}
                  style={{
                    borderColor: "#ffbf00",
                    backgroundColor: clickedIndices.includes(i)
                      ? "#ffbf00"
                      : "#27aae1",
                  }}
                  onClick={() => handleCreateWord(letter, i)}
                  disabled={clickedIndices.includes(i)}
                >
                  <span
                    className="flex justify-center items-center uppercase font-[700] 
                  text-2xl text-black w-full h-full  rounded-sm cursor-pointer"
                  >
                    {letter}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex flex-col font-[500] text-xl uppercase gap-2">
              {wordList.map((word, i) => (
                <p>{i + 1 + " - " + word}</p>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium 
              rounded-lg text-sm px-3 py-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => shuffleWord()}
            >
              Next Word
            </button>
          </div>
        </div>
      ) : (
        <GameOver />
      )}
    </div>
  );
};

export default Game;
