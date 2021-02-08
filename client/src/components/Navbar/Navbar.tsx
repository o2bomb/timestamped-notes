import React from "react";
import Link from "next/link";
import { useGetLecturesQuery, useMeQuery } from "../../generated/graphql";
import { useViewport } from "../../utils/ViewportProvider";

import styles from "./Navbar.module.css";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const viewport = useViewport();
  const { data, loading, error } = useMeQuery();
  const { data: lectureData } = useGetLecturesQuery();

  const buttons = () => {
    return data?.me ? (
      <>
        {(lectureData?.lectures || []).length > 0 ? (
          <Link href="/create-lecture">
            <button>Create a lecture</button>
          </Link>
        ) : null}
        <Link href="/logout">Logout</Link>
      </>
    ) : (
      <Link href="/login">Sign in</Link>
    );
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>
        <Link href="/">
          {viewport.width > 580 ? "timestamped_notes" : "t_n"}
        </Link>
      </div>
      <div className={styles.buttonGroup}>{buttons()}</div>
    </header>
  );
};

export default Navbar;
