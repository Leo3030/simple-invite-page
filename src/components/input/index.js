import React, { useState, useEffect } from "react";
import classnames from "classnames";
import classes from "./index.module.css";

function Input({
  className,
  name,
  value,
  onBlur,
  onChange,
  errorMsg,
  ...otherProps
}) {
  const handleInputBlur = () => {
    if (onBlur) onBlur(name);
  };

  const handleInputChange = (event) => {
    if (onChange) onChange(event.target.value);
  };

  return (
    <div className={classes.inputWrapper}>
      <input
        className={classnames(classes.input, className, errorMsg && classes.error)}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        value={value}
        {...otherProps}
      />
      {errorMsg && <p className={classes.errorMsg}>{errorMsg}</p>}
    </div>
  );
}

export default Input;
