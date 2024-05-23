'use client'
import React from "react";
import { useTranslations } from 'next-intl';


const GameOver = () => {

  const t = useTranslations('GameOver')

  const handleRefresh = () => {
    window.location.reload()
  };

  return (
    <div className="flex flex-col gap-10 justify-center items-center capitalize ">
      <h1 className="uppercase font-bold text-[800] text-[36px] tracking-[0.8em]">
        {t('title')}
      </h1>

      <button onClick={handleRefresh} className="uppercase text-[16px] font-bold underline tracking-[0.4em]">
        {t('restartGame')}
      </button>
    </div>
  );
};

export default GameOver;
