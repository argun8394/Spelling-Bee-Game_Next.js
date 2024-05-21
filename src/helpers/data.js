import axios, { AxiosResponse } from "axios";
import { wordList } from "@/data/data";

export const getData = async (lang) => {
    try {
        if (lang == "en") {
            let url = "https://random-word-api.herokuapp.com/word?length=7";

            const response = await axios.get(url);

            if (response) {
                return response.data;
            } else {
                throw new Error("Failed to fetch data");
            }
        } else {
            let data = [];
            const randomWordIndex = Math.floor(Math.random() * wordList.length);
            const word = wordList[randomWordIndex];

            if (word) {
                data.push(word);
                return [...data];
            } else {
                throw new Error("Failed to fetch data");
            }
        }
    } catch (err) {
        throw new Error(err);
    }
};

export const wordCheck = async (word, lang) => {
    try {
        let url =
            lang == "en"
                ? `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
                : `https://sozluk.gov.tr/gts?ara=${word}`;

        const response = await axios.get(url);
        if (response.status == 200) {
            return response
        } else {
            throw new Error("Failed to fetch data");
        }
    } catch (err) {
        console.log("Error message :" + err);
        throw new Error(err);
    }
};
