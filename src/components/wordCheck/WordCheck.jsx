import { useEffect, useState } from "react";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";

const WordCheck = ({
  createdWord,
  setCreatedWord,
  setClickedIndices,
  timer,
  setTimer,
  error,
  setError,
  wordList,
  setWordList,
  setTotalScore
}) => {

  const locale = useLocale();
  const t = useTranslations('WordCheck')

  const handleWordCheck = async () => {
    try {
      if (!createdWord) return;
      if (!wordList.includes(createdWord)) {
        const { data } = await axios.get("/api/wordCheck", {
          headers: {
            word: encodeURI(createdWord),
            lang: locale,
          },
        });
        setTimer((prev) => prev + 15);
        setCreatedWord("");
        setClickedIndices([]);
        setWordList((prev) => [...prev, createdWord]);
        setError("");

        return data;
      } else {
        setError(t('errorUsed'));
      }
    } catch (error) {
      console.error("Error fetching check word:", error);
      setError(t('errorInvalid'));
    }
  };


  return (
    <div className="relative flex flex-col justify-center items-center gap-12">
      <h1
        className={`${timer < 15 ? "text-red-700" : ""
          } font-[700]   text-[40px]`}
      >
        {timer}
      </h1>
      <div className="flex justify-end gap-5">
        <p className="flex justify-center font-[700] text-2xl tracking-[.4em] uppercase border-b-4 divide-x-8 border-white w-[200px]">
          {createdWord}
        </p>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => handleWordCheck()}
          disabled={timer === 0}
        >
          {t('wordCheck')}
        </button>

      </div>

      {error && <p className="absolute text-red-500 font-[600] text-xl capitalize ">{error}</p>}
    </div>
  );
};

export default WordCheck;
