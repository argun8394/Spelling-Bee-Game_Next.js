import { useEffect, useState } from "react";
import axios from "axios";

const Search = ({ createdWord, setCreatedWord }) => {
  const [timer, setTimer] = useState(15);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const handleWordCheck = async () => {
    try {
      const { data } = await axios.get("/api/wordCheck", {
        headers: {
          word: createdWord,
        },
      });
      console.log(data[0].word);
      setTimer((prev) => prev + 15);
      setIsButtonDisabled(false);
      setCreatedWord("");
      //   return data;
    } catch (error) {
      console.error("Error fetching check word:", error);
      return "";
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setIsButtonDisabled(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    console.log("search ", createdWord);
  }, [createdWord]);

  return (
    <div className=" flex gap-4">
      {/* <input
        type="text"
        placeholder="Try...."
        onChange={(e) => setSearch(e.target.value)}
        className="uppercase text-black px-2 h-10 rounded-lg"
      /> */}
      <p className="flex justify-center font-[700] text-2xl tracking-[.4em] uppercase border-b-4 divide-x-8 border-white w-[200px]">
        {createdWord}
      </p>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => handleWordCheck()}
        disabled={isButtonDisabled}
      >
        Check Word
      </button>

      <p className="text-xl">{timer} seconds remaining</p>
    </div>
  );
};

export default Search;
