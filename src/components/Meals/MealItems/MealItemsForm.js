import { useRef, useState } from "react";
import styles from "./MealItemsForm.module.css";
import Input from "../../UI/Input";

const MealItemsForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amontInputRef = useRef();
  const { id } = props;

  const submitHandler = (e) => {
    e.preventDefault();

    const enterdAmount = amontInputRef.current.value;
    const enterdAmountNumber = +enterdAmount;

    if (
      enterdAmount.trim().length === 0 ||
      enterdAmountNumber < 1 ||
      enterdAmountNumber > 8
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCard(enterdAmountNumber);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      {/* this is custom component so i need to forward ref */}
      <Input
        ref={amontInputRef}
        label="Amount"
        input={{
          id: id,
          type: "number",
          min: "1",
          max: "8",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-8)</p>}
    </form>
  );
};

export default MealItemsForm;
