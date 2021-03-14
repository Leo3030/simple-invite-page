import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./index.module.css";
import Input from "~components/input";
import Button from "~components/button";

const defaultFormData = {
  name: {
    value: "",
    error: "",
    label: "Full name",
  },
  email: {
    value: "",
    error: "",
    label: "Email",
  },
  confirmEmail: {
    value: "",
    error: "",
    label: "Confirm Email",
  },
};

const fieldList = ["name", "email", "confirmEmail"];

function InviteForm({ onSuccess, isModalOpen }) {
  const [fromData, setFromData] = useState(defaultFormData);
  const [isServerError, setIsServerError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!isModalOpen) {
      setFromData(defaultFormData);
    }
  }, [isModalOpen]);

  const handleFormSubmit = () => {
    const copyData = JSON.parse(JSON.stringify(fromData));
    let isValidated = true;
    setIsServerError(false);
    fieldList.map((field) => {
      if (fieldValidate(field)) {
        isValidated = false;
      }
      copyData[field].error = fieldValidate(field);
    });
    setFromData(copyData);
    if (isValidated) {
      setIsFetching(true);
      axios
        .post(
          "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
          {
            name: fromData["name"]?.value.trim(),
            email: fromData["email"]?.value.trim(),
          }
        )
        .then(function (response) {
          onSuccess();
          setIsFetching(false);
        })
        .catch(function () {
          setIsServerError(true);
          setIsFetching(false);
        });
    }
  };

  const fieldValidate = (type) => {
    // Email Regex to test is validate email
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const value = fromData[type].value;
    let errorMessage = "";
    switch (type) {
      //validate name is less then 3 charater
      case "name": {
        errorMessage =
          value.trim().length <= 3
            ? "Full name needs to be at least 3 characters long"
            : "";
        break;
      }
      //validate email is validate
      case "email": {
        errorMessage = !re.test(value.trim().toLowerCase())
          ? "Email needs to be in validation email format"
          : "";
        break;
      }
      //validate confirm email is validate and the same as email
      case "confirmEmail": {
        if (!value) {
          errorMessage = "Please input confirm email";
        } else if (value !== fromData["email"].value) {
          errorMessage = "Confirm Email needs to match Email";
        }

        break;
      }
    }
    return errorMessage;
  };

  const handleFieldChange = (type, value) => {
    const copyData = JSON.parse(JSON.stringify(fromData));
    copyData[type].value = value;
    copyData[type].error = "";
    setFromData(copyData);
  };

  const handleFieldValidate = (type) => {
    const errorMsg = fieldValidate(type);
    if (errorMsg) {
      const copyData = JSON.parse(JSON.stringify(fromData));
      copyData[type].error = errorMsg;
      setFromData(copyData);
    }
  };

  return (
    <div className={classes.inviteFormWrapper} jest-id="invite-form">
      <h4 className={classes.modalTitle}>Request an invite</h4>

      <form className={classes.form}>
        {fieldList.map((type) => (
          <Input
            key={type}
            type="input"
            name={type}
            onBlur={handleFieldValidate}
            errorMsg={fromData[type].error}
            onChange={(e) => {
              handleFieldChange(type, e);
            }}
            placeholder={fromData[type].label}
            value={fromData[type].value}
          />
        ))}

        <Button
          type="button"
          onClick={handleFormSubmit}
          className={classes.btn}
          loading={isFetching}
        >
          Send
        </Button>
        {isServerError && (
          <p className={classes.errorMessage}>
            Error message from server here.
          </p>
        )}
      </form>
    </div>
  );
}

export default InviteForm;
