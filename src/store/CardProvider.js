import { useReducer, useState } from "react";
import CardContext from "./card-context";

const defaultCardState = {
  items: [],
  totalAmount: 0,
};

const cardReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCardItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCardItem = state.items[existingCardItemIndex]; // if the item not in the array, it will set to null
    let updatedItems;

    if (existingCardItem) {
      const updatedItem = {
        ...existingCardItem,
        amount: existingCardItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingCardItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "REMOVE") {
    const existingCardItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingCardItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCardItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCardState;
};

const defaultSubmitState = {
  submiting: false,
  submitingHasError: null,
};

const submitReducer = (state, action) => {
  if (action.type === "submiting") {
    return { ...state, submiting: action.value };
  } else if (action.type === "error") {
    return { ...state, submitingHasError: action.value };
  } else {
    return defaultSubmitState;
  }
};

const CardProvider = (props) => {
  const [cardState, dispatchCardState] = useReducer(
    cardReducer,
    defaultCardState
  );

  const [submitState, dispatchSubmitState] = useReducer(
    submitReducer,
    defaultSubmitState
  );

  const [showCard, setShowCard] = useState(false);
  const [sucsses, setSucsses] = useState(false);
  const [showLogMasseg, setShowLogMasseg] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDataForOrder, setUserDataForOrder] = useState({});

  // item is an object with meal data
  const addItemToCardHandler = (item) => {
    dispatchCardState({ type: "ADD", item: item });
  };

  const removeItemFromCardHandler = (id) => {
    dispatchCardState({ type: "REMOVE", id: id });
  };

  const newOrderHandler = () => {
    dispatchCardState({ type: "newOrder" });
  };

  // for POST data in firebase
  const userDataHandler = async (data) => {
    const { name, email, password } = data;
    dispatchSubmitState({ type: "submiting", value: true });
    setSucsses(false);

    try {
      dispatchSubmitState({ type: "error", value: null });
      const response = await fetch(
        "https://reactmeals-80774-default-rtdb.firebaseio.com/LogIn.json",
        {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
          headers: { "content-type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("");
      }

      setUserDataForOrder({ name, email, password });
      data.resetName();
      data.resetEmail();
      data.resetPassword();
      data.onLogIn();
      data.onHideCard();
      hideLogMassegHandler();
    } catch (err) {
      dispatchSubmitState({ type: "error", value: "Somthing went wrong" });
    }

    dispatchSubmitState({ type: "submiting", value: false });
  };

  const showCardOrderdHandler = () => {
    setShowCard(true);
  };

  const hideCardOrderdHandler = () => {
    setShowCard(false);
  };

  const showLogMassegHandler = () => {
    setShowLogMasseg(true);
  };

  const hideLogMassegHandler = () => {
    setShowLogMasseg(false);
  };

  const logedInHandler = () => {
    setIsLoggedIn(true);
  };

  const logedOutHandler = () => {
    setIsLoggedIn(false);
  };

  // this is the object that will be updated
  const cardContext = {
    items: cardState.items,
    totalAmount: cardState.totalAmount,
    addItem: addItemToCardHandler,
    removeItem: removeItemFromCardHandler,
    newOrder: newOrderHandler,
    onSubmitionData: userDataHandler,
    submitState: submitState,
    sucsses: sucsses,
    showLogMasseg: showLogMasseg,
    onShowLogMasseg: showLogMassegHandler,
    onHideLogMasseg: hideLogMassegHandler,
    isLoggedInValue: isLoggedIn,
    logedInHandler: logedInHandler,
    logedOutHandler: logedOutHandler,
    showCard: showCard,
    showCardOrderdHandler: showCardOrderdHandler,
    hideCardOrderdHandler: hideCardOrderdHandler,
    userDataForOrder: userDataForOrder,
  };

  return (
    <CardContext.Provider value={cardContext}>
      {props.children}
    </CardContext.Provider>
  );
};

export default CardProvider;
