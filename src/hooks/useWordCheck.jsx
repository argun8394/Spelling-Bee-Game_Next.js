import React, { useState } from 'react'
import axios from 'axios';
import { useLocale, useTranslations } from 'next-intl';

const useWordCheck = (setTimer) => {
    const [error, setError] = useState("");
    const [createdWord, setCreatedWord] = useState("");
    const [clickedIndices, setClickedIndices] = useState([]);
    const [wordList, setWordList] = useState([]);

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

    return {
        handleWordCheck, error, setError, createdWord, setCreatedWord, clickedIndices,
        setClickedIndices, wordList, setWordList
    }
}

export default useWordCheck
