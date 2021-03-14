import React from "react";
import classnames from "classnames";
import classes from "./index.module.css";

function Loading({ className }) {
  return (
    <div className={classes.root}>
      <div className={classes.loadingWrapper}>
        <div className={classes.loadingContent}></div>
        <div className={classnames(classes.loadingContent, classes.loadingContent2)}></div>
        <div className={classnames(classes.loadingContent, classes.loadingContent3)}></div>
      </div>
    </div>
  );
}

export default Loading;
