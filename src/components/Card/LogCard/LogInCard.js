import { useContext } from "react";
import CardContext from "../../../store/card-context";

import useInput from "../../../Hooks/use-input";
import Modal from "../../UI/Modal";
import styles from "./LogInCard.module.css";

const LogInCard = (props) => {
  const {
    enterdInput: enterdName,
    inputIsInValid: nameInputHasError,
    inputIsValid: enterdNameIsValid,
    inputBlurHandler: nameBlurHandler,
    inputChangeHandler: nameChangeHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    enterdInput: enterdEmail,
    inputIsInValid: emailInputHasError,
    inputIsValid: enterdEmailIsValid,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    enterdInput: enterdPassword,
    inputIsInValid: passwordInputHasError,
    inputIsValid: enterdPasswordIsValid,
    inputBlurHandler: passwordBlurHandler,
    inputChangeHandler: passwordChangeHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim().length >= 4 && value.trim().length <= 8);

  const cardCtx = useContext(CardContext);
  const { submiting, submitingHasError } = cardCtx.submitState;

  const allInputsValid =
    !enterdNameIsValid || !enterdEmailIsValid || !enterdPasswordIsValid;

  const disableButton = allInputsValid || submiting;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (allInputsValid) {
      return;
    }

    cardCtx.onSubmitionData({
      name: enterdName,
      email: enterdEmail,
      password: enterdPassword,
      resetName: resetNameInput,
      resetEmail: resetEmailInput,
      resetPassword: resetPasswordInput,
      onLogIn: props.onLogIn,
      onHideCard: props.onHideCard,
    });
  };

  return (
    <Modal onClose={props.onHideCard} id="formCard">
      <form className={styles.form} onSubmit={submitHandler}>
        <div
          className={
            nameInputHasError
              ? `${styles["form-control"]} ${styles["invalid"]}`
              : styles["form-control"]
          }
        >
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            value={enterdName}
            onBlur={nameBlurHandler}
            onChange={nameChangeHandler}
            autoComplete="name"
          />
          {nameInputHasError && (
            <p className={styles["error-text"]}>Name should not be empty</p>
          )}
        </div>
        <div
          className={
            emailInputHasError
              ? `${styles["form-control"]} ${styles["invalid"]}`
              : styles["form-control"]
          }
        >
          <label htmlFor="email">Your Email:</label>
          <input
            type="text"
            id="email"
            value={enterdEmail}
            onBlur={emailBlurHandler}
            onChange={emailChangeHandler}
            autoComplete="email"
          />
          {emailInputHasError && (
            <p className={styles["error-text"]}>Email should contain '@'</p>
          )}
        </div>
        <div
          className={
            passwordInputHasError
              ? `${styles["form-control"]} ${styles["invalid"]}`
              : styles["form-control"]
          }
        >
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={enterdPassword}
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}
            autoComplete="off"
          />
          {passwordInputHasError && (
            <p className={styles["error-text"]}>
              Password should be (4 to 8) character
            </p>
          )}
        </div>
        <div className={styles["form-actions"]}>
          {submitingHasError && <p>{submitingHasError}</p>}
          <button className={styles["button"]} disabled={disableButton}>
            {submiting ? "submiting..." : "Submit"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LogInCard;
