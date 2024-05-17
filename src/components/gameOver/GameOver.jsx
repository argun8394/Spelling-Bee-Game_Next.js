import React from "react";

const GameOver = () => {
  return (
    <div className="flex flex-col gap-10 justify-center items-center capitalize ">
      <h1 className="uppercase font-bold text-[800] text-[36px] tracking-[0.8em]">
        GameOver
      </h1>

      <p className="uppercase text-[16px] font-bold underline tracking-[0.4em]">
        restart the game
      </p>
    </div>
  );
};

export default GameOver;
