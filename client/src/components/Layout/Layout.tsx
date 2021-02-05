import React from "react";
import Head from "next/head";
import Navbar from "../Navbar";

import styles from "./Layout.module.css";

type LayoutVariant = "small" | "regular" | "large";

interface LayoutProps {
  navigation?: boolean;
  variant?: LayoutVariant;
}

const Layout: React.FC<LayoutProps> = ({ navigation = true, variant = "regular", children }) => {
  let maxWidth;
  let margin = undefined;
  switch (variant) {
    case "large":
      maxWidth = "100%";
      margin = "0 1rem";
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
      {!navigation ? null : <Navbar />}
      <main className={styles.main} style={{
        maxWidth,
        margin
      }}>{children}</main>
    </>
  );
};

export default Layout;
