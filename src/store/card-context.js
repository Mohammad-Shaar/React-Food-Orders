import React from "react";

const CardContext = React.createContext({
  // This value will never be used but we writed for better auto completion
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  newOrder: () => {},
  onSubmitionData: () => {},
  submitState: {},
  sucsses: false,
  showLogMasseg: false,
  onshowLogMasseg: () => {},
  onhideLogMasseg: () => {},
  showCard: false,
  showCardOrderdHandler: () => {},
  hideCardOrderdHandler: () => {},
  userDataForOrder: {},
});

export default CardContext;
