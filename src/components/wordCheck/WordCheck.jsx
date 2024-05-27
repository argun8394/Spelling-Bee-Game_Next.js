
import { useLocale, useTranslations } from "next-intl";
import Button from "../button/Button";

const WordCheck = ({ createdWord, timer, error, handleWordCheck }) => {
  const locale = useLocale();
  const t = useTranslations("WordCheck");

  return (
    <div className="relative flex flex-col justify-center items-center gap-12">
      <h1
        className={`${timer < 15 ? "text-red-700" : ""
          } font-[700]   text-[40px]`}
      >
        {timer}
      </h1>
      <div className="flex justify-end gap-5">
        <p className="flex justify-center font-[700] text-2xl tracking-[.4em] uppercase border-b-4 divide-x-8 border-white w-[200px]">
          {createdWord}
        </p>

        <Button handleClick={handleWordCheck} title={t("wordCheck")} />
      </div>

      {error && (
        <p className="absolute text-red-500 font-[600] text-xl capitalize ">
          {error}
        </p>
      )}
    </div>
  );
};

export default WordCheck;
