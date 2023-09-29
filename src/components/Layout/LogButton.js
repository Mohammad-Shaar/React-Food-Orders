import styles from "./LogButton.module.css";

const LogButton = (props) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {!props.loggedState ? "Log in" : "Log out"}
    </button>
  );
};

export default LogButton;
