import React from 'react';
import classes from "./index.module.css";

function Header() {
  return <div className={classes.headerWrapper}>
    <h3 className={classes.title}>Broccoli & Co.</h3>
  </div>;
}

export default Header;
