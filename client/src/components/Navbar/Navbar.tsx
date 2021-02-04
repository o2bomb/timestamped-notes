import React from 'react'
import Link from "next/link";
import { useMeQuery } from '../../generated/graphql';

import styles from "./Navbar.module.css";

interface NavbarProps {

}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data, loading, error } = useMeQuery();

  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>
        {
          data?.me ? `Welcome back, ${data.me.displayName}` : "timestamped_notes"
        }
      </div>
      <div className={styles.buttonGroup}>
        {
          data?.me ? (
            <Link
              href="/logout"
            >
              Logout
            </Link>
          ) : (
                <Link
              href="/auth/github"
            >
              Sign in with GitHub
            </Link>
          )
        }
      </div>
    </header>
  );
}

export default Navbar;