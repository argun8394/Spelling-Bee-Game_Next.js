import Link from "next/link";
import { useTranslations } from 'next-intl';


const NotFound = () => {
    const t = useTranslations('NotFoundPage');

    return (
        <div className="flex flex-col justify-center items-center gap-10">
            <h2 className="font-[700] text-2xl">{t('title')}</h2>
            <p className="font-[500] text-xl">Sorry, the page you are lookingfor does not exist.</p>
            <Link href="/" className="underline">Return HomePage</Link>
        </div>
    );
};

export default NotFound;