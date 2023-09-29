import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div
      className={
        props.id === "formCard"
          ? `${styles.modal} ${styles["modal-form"]}`
          : styles.modal
      }
    >
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay id={props.id}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
