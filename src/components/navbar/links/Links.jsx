"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";

const links = [
  { title: "HomePage", path: "/" },
  // { title: "About", path: "/about" },
  // { title: "Contact", path: "/contact" },
  // { title: "Blog", path: "/blog" },
];

const Links = () => {
  const [open, setOpen] = useState(false);

  return (
    <div styles={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
      </div>
      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;
