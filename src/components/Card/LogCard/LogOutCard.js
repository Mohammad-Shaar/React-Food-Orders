import styles from "./LogOutCard.module.css";
import Modal from "../../UI/Modal";

const LogOutCard = (props) => {
  const clickHandler = () => {
    props.onHideCard();
    props.onLogOut();
  };
  return (
    <Modal onClose={props.onHideCard} id="formCard">
      <p className={styles.warning}>Are you sure you want to log out?</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onHideCard}>
          No
        </button>
        <button className={styles["button--alt"]} onClick={clickHandler}>
          Yes
        </button>
      </div>
    </Modal>
  );
};

export default LogOutCard;
