import React from 'react';
import classnames from 'classnames';
import classes from "./index.module.css";

function Footer() {
  return <div className={classes.footerWrapper} jest-id="footer">
    <div className={classes.contentWrapper}>
      <p className={classnames(classes.footerText)}>Made with ❤️ in Melbourne</p>
      <p className={classes.footerText}>© 2021 Broccoli & Co. All rights reserved</p>
    </div>
    
  </div>;
}

export default Footer;
