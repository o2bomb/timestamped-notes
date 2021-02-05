import React from "react";
import Link from "next/link";
import { useMeQuery } from "../../generated/graphql";

import styles from "./Navbar.module.css";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data, loading, error } = useMeQuery();

  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>
        <Link href="/">timestamped_notes</Link>
      </div>
      <div className={styles.buttonGroup}>
        {data?.me ? (
          <>
            <Link href="/create-lecture">Create a lecture</Link>
            <Link href="/logout">Logout</Link>
          </>
        ) : (
          <Link href="/login">Sign in</Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
