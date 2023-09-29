import { useState, useContext, useEffect } from "react";
import CardContext from "../../store/card-context";

import styles from "./HeaderCardButton.module.css";
import CardIcon from "../Card/CardIcon";

const HeaderCardButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cardCtx = useContext(CardContext);

  const numberOfCardItem = cardCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const { items } = cardCtx;
  const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles["icon"]}>
        <CardIcon />
      </span>
      <span>Your Card</span>
      <span className={styles["badge"]}>{numberOfCardItem}</span>
    </button>
  );
};

export default HeaderCardButton;
