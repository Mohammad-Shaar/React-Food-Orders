import { useContext } from "react";
import CardContext from "../../../store/card-context";
import styles from "./MealItems.module.css";
import MealItemsForm from "./MealItemsForm";

const MealItems = (props) => {
  const cartCtx = useContext(CardContext);

  const mealData = props.mealData;
  const price = `$${mealData.price.toFixed(2)}`;

  const addToCardHandler = (amount) => {
    cartCtx.addItem({
      id: mealData.id,
      name: mealData.name,
      amount: amount,
      price: mealData.price,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{mealData.name}</h3>
        <div className={styles.description}>{mealData.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemsForm onAddToCard={addToCardHandler} id={mealData.id} />
      </div>
    </li>
  );
};

export default MealItems;
