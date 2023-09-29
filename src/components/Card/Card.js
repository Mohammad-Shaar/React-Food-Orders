import { useContext, useState } from "react";
import CardContext from "../../store/card-context";

import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import styles from "./Card.module.css";

const Card = (props) => {
  const [btnOrder, setBtnOrder] = useState({
    btnNew: false,
    btnValue: "Order",
  });

  const [orderError, setOrderError] = useState(null);

  const cardCtx = useContext(CardContext);
  const { showLogMasseg, onShowLogMasseg, userDataForOrder } = cardCtx;

  const orderHandler = async () => {
    if (props.logState) {
      if (btnOrder.btnValue === "Order" || btnOrder.btnValue === "Try again") {
        setBtnOrder((prevState) => {
          return { ...prevState, btnValue: "Ordering.." };
        });
        try {
          setOrderError(null);
          const response = await fetch(
            "https://reactmeals-80774-default-rtdb.firebaseio.com/order.json",
            {
              method: "POST",
              body: JSON.stringify({
                userData: userDataForOrder,
                orderdItems: cardCtx.items,
              }),
              headers: { "content-type": "application/json" },
            }
          );

          if (!response.ok) {
            throw new Error("");
          }

          setBtnOrder((prevState) => {
            return { ...prevState, btnNew: true, btnValue: "New Order" };
          });
        } catch (err) {
          setOrderError("Somthing went wrong");
          setBtnOrder((prevState) => {
            return { ...prevState, btnNew: false, btnValue: "Try again" };
          });
        }
      } else if (btnOrder.btnValue === "New Order") {
        props.onHideCard();
        cardCtx.newOrder();
      }
    } else {
      onShowLogMasseg(true);
    }
  };

  const logInHandler = () => {
    props.onClickLog();
    props.onLogIn();
  };

  const closeHandler = () => {
    props.onHideCard();
    btnOrder.btnNew && cardCtx.newOrder();
  };

  const cardItemRemoveHandler = (id) => {
    cardCtx.removeItem(id);
  };

  const cardItemAddHandler = (item) => {
    cardCtx.addItem({ ...item, amount: 1 });
  };

  const totalAmount = `$${cardCtx.totalAmount.toFixed(2)}`;
  const hasItems = cardCtx.items.length > 0;
  const cardItems = cardCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={cardItemRemoveHandler.bind(null, item.id)}
      onAdd={cardItemAddHandler.bind(null, item)}
      disabelBtn={btnOrder.btnNew}
    />
  ));

  return (
    <Modal onClose={closeHandler} id="orderCard">
      <>
        <ul className={styles["cart-items"]}>{cardItems}</ul>
        <div className={styles.total}>
          <span>Total</span>
          <span>{totalAmount}</span>
        </div>
        <div className={styles.actions}>
          {!showLogMasseg && (
            <button className={styles["button--alt"]} onClick={closeHandler}>
              Close
            </button>
          )}
          {hasItems && !showLogMasseg && (
            <button
              className={styles.button}
              onClick={orderHandler}
              disabled={btnOrder.btnValue === "Ordering.."}
            >
              {btnOrder.btnValue}
            </button>
          )}
        </div>
        {btnOrder.btnNew && (
          <p className={styles["final-masseg"]}>
            Thank you for using our website, you will receive your order in
            about 30 minutes...
          </p>
        )}
        {orderError && (
          <p className={styles["final-masseg"]}>{orderError}, Try again</p>
        )}
        {showLogMasseg && (
          <div className={`${styles.actions} ${styles["actions-center"]}`}>
            <p>You need to log in first</p>
            <div className={styles.buttons}>
              <button className={styles.button} onClick={logInHandler}>
                Log in
              </button>
              <button
                className={styles["button--alt"]}
                onClick={props.onHideCard}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </>
    </Modal>
  );
};

export default Card;
