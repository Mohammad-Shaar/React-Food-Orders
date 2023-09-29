import { useEffect, useState, useCallback } from "react";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItems from "./MealItems/MealItems";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLodding, setIsLodding] = useState(false);
  const [hasError, setHasError] = useState(null);

  const fetchMeals = useCallback(async () => {
    try {
      setIsLodding(true);
      setHasError(null);
      const response = await fetch(
        "https://reactmeals-80774-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("");
      }

      const data = await response.json();

      let result = [];
      for (let key in data) {
        result.push({
          id: key,
          ...data[key],
        });
      }

      setMeals(result);
    } catch (err) {
      setHasError("Somthing went wrong");
    }
    setIsLodding(false);
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const mealsList =
    meals.length !== 0
      ? meals.map((meal) => <MealItems key={meal.id} mealData={meal} />)
      : !isLodding &&
        !hasError && (
          <p className={styles["p-center"]}>
            Sorry, No meals avilable right now
          </p>
        );

  let content;
  if (isLodding) {
    content = <p className={styles["p-center"]}>Lodding...</p>;
  }
  if (hasError) {
    content = <p className={styles["p-center"]}>{hasError}</p>;
  }

  return (
    <section className={styles["meals"]}>
      <Card>
        <ul>{mealsList}</ul>
        {content}
      </Card>
    </section>
  );
};

export default AvailableMeals;
