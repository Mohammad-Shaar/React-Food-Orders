import HeaderCardButton from "./HeaderCardButton";
import LogButton from "./LogButton";

import styles from "./Header.module.css";
import mealImg from "../../assets/meals.jpg";

const Header = (props) => {
  return (
    <>
      <header className={styles["header"]}>
        <h1>ReactMeals</h1>
        <div className={styles.buttons}>
          <HeaderCardButton onClick={props.onShowOrderCard} />
          <LogButton
            onClick={props.onShowLogCard}
            loggedState={props.loggedState}
          />
        </div>
      </header>
      <div className={styles["main-image"]}>
        <img src={mealImg} alt="table of food" />
      </div>
    </>
  );
};

export default Header;
