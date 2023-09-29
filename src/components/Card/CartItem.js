import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  const listClasses = `${classes["cart-item"]} ${
    props.disabelBtn ? classes["cart-item-block"] : ""
  }`;
  return (
    <li className={listClasses}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      {!props.disabelBtn && (
        <div className={classes.actions}>
          <button onClick={props.onRemove}>−</button>
          <button onClick={props.onAdd}>+</button>
        </div>
      )}
    </li>
  );
};

export default CartItem;
