import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslations } from "next-intl";

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
  lang,
  setLang,
  setTotalScore
}) => {

  const t = useTranslations('WordCheck')

  const toggleLanguage = () => {
    setLang((prevLang) => (prevLang === "en" ? "tr" : "en"));
    console.log(lang)
    setWordList([])
    setTotalScore(0)
  };

  const handleWordCheck = async () => {
    try {
      if (!createdWord) return;
      if (!wordList.includes(createdWord)) {
        const { data } = await axios.get("/api/wordCheck", {
          headers: {
            word: encodeURI(createdWord),
            lang: lang,
          },
        });
        setTimer((prev) => prev + 15);
        setCreatedWord("");
        setClickedIndices([]);
        setWordList((prev) => [...prev, createdWord]);
        setError("");
        console.log(wordList);

        return data;
      } else {
        setError("You have used this word before!");
      }
    } catch (error) {
      console.error("Error fetching check word:", error);
      setError("invalid word");
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [setTimer]);

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
        <button
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
          onClick={toggleLanguage}
        >
          {lang === "en" ? "TR" : "EN"}
        </button>
      </div>

      {error && <p className="absolute text-red-500 font-[600] text-2xl capitalize ">{error}</p>}
    </div>
  );
};

export default WordCheck;
