import React from 'react'

import styles from "./Navbar.module.css";

interface NavbarProps {

}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <header className={styles.navbar}>
      Navbar
    </header>
  );
}

export default Navbar;