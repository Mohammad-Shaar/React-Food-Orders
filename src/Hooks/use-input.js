import { useState } from "react";

const useInput = (validateValue) => {
  const [enterdInput, setEnterdInput] = useState("");
  const [enterdInputTouched, setEnterdInputTouched] = useState(false);

  const inputIsValid = validateValue(enterdInput);
  const inputIsInValid = !inputIsValid && enterdInputTouched;

  const inputBlurHandler = (e) => {
    setEnterdInputTouched(true);
  };

  const inputChangeHandler = (e) => {
    setEnterdInput(e.target.value);
  };

  const reset = () => {
    setEnterdInput("");
    setEnterdInputTouched(false);
  };

  return {
    enterdInput,
    inputIsInValid,
    inputIsValid,
    inputBlurHandler,
    inputChangeHandler,
    reset,
  };
};

export default useInput;
