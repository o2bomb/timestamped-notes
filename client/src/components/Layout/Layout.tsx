import React from "react";
import Head from "next/head";
import Navbar from "../Navbar";

import styles from "./Layout.module.css";
import { NavbarProps } from "../Navbar/Navbar";

type LayoutVariant = "small" | "regular" | "large";

interface LayoutProps extends NavbarProps {
  showNavbar?: boolean;
  variant?: LayoutVariant;
}

const Layout: React.FC<LayoutProps> = ({
  showNavbar = true,
  variant = "regular",
  children,
  ...navbarProps
}) => {
  let maxWidth;
  switch (variant) {
    case "large":
      maxWidth = "100%";
      break;
    case "regular":
      maxWidth = "80rem";
      break;
    case "small":
      maxWidth = "40rem";
      break;
    default:
      maxWidth = "80rem";
  }

  return (
    <>
      <Head>
        <title>timestamped-notes</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      {!showNavbar ? null : <Navbar {...navbarProps} />}
      <main
        className={styles.main}
        style={{
          maxWidth,
        }}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
