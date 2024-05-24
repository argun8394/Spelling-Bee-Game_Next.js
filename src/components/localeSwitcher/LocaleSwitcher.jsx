"use client"
import { locales } from '@/i18n'
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from 'react';

const LocaleSwitcher = () => {
    const locale = useLocale();
    const router = useRouter();
    const [lang, setLang] = useState(locale);
    const pathname = usePathname();

    useEffect(() => {
        setLang(locale);
    }, [locale]);

    const handleLocaleChange = (newLocale) => {
        setLang(newLocale);
        // document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
        const newUrl = `/${newLocale}${pathname.replace(`/${locale}`, '')}`;
        router.push(newUrl);
    }

    return (
        <div className='flex'>
            <button className="btn btn-primary border uppercase w-8 h-8 "
                onClick={() => handleLocaleChange(lang === 'en' ? 'tr' : 'en')} >
                {lang}
            </button>
        </div>
    );
};

export default LocaleSwitcher;
