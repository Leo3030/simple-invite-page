import React from "react";
import classes from "./index.module.css";
import Button from "~components/button";

function SuccessContent({onClose}) {
  return (
    <div
      className={classes.successContentWrapper}
      jest-id="success-content"
    >
      <h4 className={classes.modalTitle}>All done!</h4>

      <p className={classes.summary}>You will be one of the first to experience Broccoli & Co. when we lunch</p>

      <Button className={classes.btn} onClick={onClose}>OK</Button>
    </div>
  );
}

export default SuccessContent;
