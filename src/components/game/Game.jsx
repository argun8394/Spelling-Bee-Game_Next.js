"use client";
import React, { useEffect, useState } from "react";
import style from "./game.module.css";
// import { positions } from "@/data/data";
import axios from "axios";
import WordCheck from "../wordCheck/WordCheck";
import GameOver from "../gameOver/GameOver";
import Loading from "../loading/Loading";
import Score from "@/components/score/Score";
import { useLocale, useTranslations } from "next-intl";
import useTimer from "@/hooks/useTimer";
import useWordCheck from "@/hooks/useWordCheck";
import useShuffleWord from "@/hooks/useShuffleWord";
import useCreateWord from "@/hooks/useCreateWord";
import Button from "../button/Button";

const Game = () => {
  const [totalScore, setTotalScore] = useState(0);
  const [createdWord, setCreatedWord] = useState("");

  const { timer, setTimer } = useTimer();

  const {
    handleWordCheck,
    error,
    setError,
    clickedIndices,
    setClickedIndices,
    wordList,
    setWordList,
  } = useWordCheck(setTimer, createdWord, setCreatedWord);

  const { shuffWord, shuffleWord, loading } = useShuffleWord(
    setClickedIndices,
    setCreatedWord,
    setError
  );

  const { handleCreateWord } = useCreateWord(
    error,
    setError,
    setCreatedWord,
    clickedIndices,
    setClickedIndices
  );

  const locale = useLocale();
  const t = useTranslations("GamePage");

  useEffect(() => {
    setWordList([]);
    setTotalScore(0);

    shuffleWord();
  }, [locale]);

  const positions = [
    { x: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" },
    { x: "top-0 right-1/4 mt-[30px]" },
    { x: "top-1/3 right-10 mt-[22px]" },
    { x: "bottom-[30px] right-1/4" },
    { x: "bottom-[30px] left-1/4" },
    { x: "top-1/3 left-10 mt-[22px]" },
    { x: "top-0 left-1/4 mt-[30px]" },
  ];

  return (
    <div className={style.container}>
      {timer > 0 ? (
        <div>
          {loading && <Loading />}
          {!loading && (
            <div className="flex flex-col gap-10">
              <div className="flex justify-center items-end ">
                <WordCheck
                  createdWord={createdWord}
                  setCreatedWord={setCreatedWord}
                  setClickedIndices={setClickedIndices}
                  timer={timer}
                  setTimer={setTimer}
                  error={error}
                  setError={setError}
                  wordList={wordList}
                  setWordList={setWordList}
                  handleWordCheck={handleWordCheck}
                  setTotalScore={setTotalScore}
                />
              </div>
              <div className="flex gap-10">
                <Score
                  wordList={wordList}
                  totalScore={totalScore}
                  setTotalScore={setTotalScore}
                />

                <div className=" relative w-[340px] h-[250px] ">
                  {shuffWord.split("").map((letter, i) => (
                    <button
                      key={i}
                      className={`absolute ${positions[i]?.x} w-[84px] h-[40px]
                      bg-transparent flex justify-center 
                      items-center before:absolute before:top-[-30px] before:w-0 before:h-0 
                      before:border-b-[30px] ${clickedIndices?.includes(i)
                          ? "before:border-b-[#ffbf00]"
                          : "before:border-b-[#27aae1]"
                        } before:border-l-[42px] 
                      before:border-l-transparent before:border-r-[40px] before:border-r-transparent after:absolute 
                      after:bottom-[-30px] after:w-0 after:border-t-[30px] ${clickedIndices?.includes(i)
                          ? "after:border-t-[#ffbf00]"
                          : "after:border-t-[#27aae1]"
                        }  after:border-l-[42px] 
                      after:border-l-transparent after:border-r-[42px] after:border-r-transparent`}
                      style={{
                        borderColor: "#ffbf00",
                        backgroundColor: clickedIndices?.includes(i)
                          ? "#ffbf00"
                          : "#27aae1",
                      }}
                      onClick={() => handleCreateWord(letter, i)}
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
                    <p key={i}>{i + 1 + " - " + word}</p>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <Button handleClick={shuffleWord} title={t("nextWord")} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <GameOver />
      )}
    </div>
  );
};

export default Game;
