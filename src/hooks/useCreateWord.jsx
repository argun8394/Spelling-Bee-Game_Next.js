import React from 'react'

const useCreateWord = (error, setError, setCreatedWord, clickedIndices, setClickedIndices) => {

    const handleCreateWord = (letter, index) => {
        if (error) setError("");
        if (!clickedIndices.includes(index)) {
            setCreatedWord((prev) => prev + letter);
            setClickedIndices((prev) => [...prev, index]);
        } else {
            setClickedIndices((prev) => prev.filter((i) => i !== index));

            setCreatedWord((prev) => {
                const wordArray = prev.split("");
                const letterIndex = clickedIndices.indexOf(index);
                if (letterIndex !== -1) {
                    wordArray.splice(letterIndex, 1);
                }
                return wordArray.join("");
            });
        }
    };

    return { handleCreateWord }
}

export default useCreateWord