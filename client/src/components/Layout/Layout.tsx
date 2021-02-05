import React from "react";
import Head from "next/head";
import Navbar from "../Navbar";

import styles from "./Layout.module.css";

interface LayoutProps {
  navigation?: boolean
}

const Layout: React.FC<LayoutProps> = ({ navigation = true, children }) => {
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
      {
        !navigation ? null : <Navbar />
      }
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
