import axios, { AxiosResponse } from "axios";

export const getData = async () => {
    try {
        let url = "https://random-word-api.herokuapp.com/word?length=7"

        const response = await axios.get(url)
        console.log(response.data)

        if (response) {
            return response.data;
        } else {
            throw new Error("Failed to fetch data");
        }

    } catch (err) {
        throw new Error(err)
    }
}


export const wordCheck = async (word) => {
    try {
        let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

        const response = await axios.get(url)
        console.log(response.data)

        if (response) {
            return response.data;
        } else {
            throw new Error("Failed to fetch data");
        }

    } catch (err) {
        throw new Error(err)
    }
}