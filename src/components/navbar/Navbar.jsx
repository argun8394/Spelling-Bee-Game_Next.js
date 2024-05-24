import Link from "next/link";
import React from "react";
import Links from "./links/Links";
import styles from "./navbar.module.css";
import LocaleSwitcher from "../localeSwitcher/LocaleSwitcher";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        Spelling Bee
      </Link>
      <div className="flex justify-center items-center gap-4">
        <Links />
        <LocaleSwitcher />
      </div>
    </div>
  );
};

export default Navbar;
