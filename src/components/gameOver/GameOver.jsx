'use client'

import Link from "next/link";
import React from "react";
import { useRouter } from 'next/navigation'

const GameOver = () => {

  const router = useRouter();

  const handleRefresh = () => {
    window.location.reload()
  };


  return (
    <div className="flex flex-col gap-10 justify-center items-center capitalize ">
      <h1 className="uppercase font-bold text-[800] text-[36px] tracking-[0.8em]">
        GameOver
      </h1>

      <button onClick={handleRefresh} className="uppercase text-[16px] font-bold underline tracking-[0.4em]">
        restart the game
      </button>

    </div>
  );
};

export default GameOver;
