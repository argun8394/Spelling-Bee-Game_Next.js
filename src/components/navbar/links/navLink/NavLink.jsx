"use client";

import Link from "next/link";
import React from "react";
import styles from "./navLink.module.css";
import { useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const NavLink = ({ item }) => {

  const { locale } = useParams()
  const t = useTranslations('NavLinks')
  const pathName = usePathname();

  return (
    <Link
      href={item.path}
      className={`${styles.container} ${pathName === (item.path + locale) && styles.active
        }`}
    >
      {t(item.title)}
    </Link>
  );
};

export default NavLink;
