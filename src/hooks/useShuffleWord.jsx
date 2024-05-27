import { useState } from "react";
import axios from "axios";
import { useLocale } from "next-intl";

const useShuffleWord = (setClickedIndices, setCreatedWord, setError) => {
    const [shuffWord, setShuffWord] = useState("");
    const [loading, setLoading] = useState(true);

    const locale = useLocale();

    const getRandomWord = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("/api/game", {
                headers: {
                    lang: locale,
                },
            });
            return data[0];
        } catch (error) {
            throw new Error("Error fetching random word:", error);
        } finally {
            setLoading(false);
        }
    };

    const shuffleWord = async () => {
        const word = await getRandomWord();
        if (!word) return;

        const letters = word.split("");
        const shuffledLetters = [];
        setError("");

        while (letters.length > 0) {
            const randomIndex = Math.floor(Math.random() * letters.length);
            const randomLetter = letters.splice(randomIndex, 1)[0];
            shuffledLetters.push(randomLetter);
        }

        const shuffledWord = shuffledLetters.join("");
        setClickedIndices([]);
        setCreatedWord("");
        setShuffWord(shuffledWord);
    };


    return { shuffWord, shuffleWord, loading }
}

export default useShuffleWord