import React, { useState, useEffect } from 'react';

const Point = ({ wordList, totalScore, setTotalScore }) => {

    const letterPoints = {
        A: 1, B: 2.5, C: 3, Ç: 3, D: 2, E: 1, F: 4.5, G: 3, H: 4, I: 1,
        İ: 1, J: 8, K: 3, L: 1, M: 2, N: 1, O: 2.5, Ö: 5, P: 3, Q: 10,
        R: 1, S: 1.5, Ş: 3, T: 1, U: 2, Ü: 2, V: 4, W: 4, X: 8, Y: 3, Z: 6
    };

    const calculateScore = (word) => {
        return word.toUpperCase().split('').reduce((acc, letter) => acc + (letterPoints[letter] || 0), 0);
    };

    useEffect(() => {
        console.log(wordList)
        const total = wordList.reduce((acc, word) => acc + calculateScore(word), 0);
        setTotalScore(total);
    }, [wordList]);

    return (
        <div className="flex flex-col justify-start items-center">
            <h1 className='font-[700] text-[24px]'>Score</h1>
            <p className='font-[600] text-[20px]'>{totalScore}</p>
        </div>
    )
}

export default Point