import React from "react";
import classnames from "classnames";
import classes from "./index.module.css";
import Loading from '~components/loading';

function Button({
  children,
  className,
  loading = false,
  disabled = false,
  ...otherProps
}) {
  return (
    <button
      className={classnames(
        classes.buttonWrapper,
        (loading || disabled) && classes.disabled,
        className
      )}
      {...otherProps}
    >
      {!loading && children}
      {loading && <Loading />}
    </button>
  );
}

export default Button;
