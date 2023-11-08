import { useState, useContext } from "react";
import CardContext from "./store/card-context";

import Card from "./components/Card/Card";
import LogInCard from "./components/Card/LogCard/LogInCard";
import LogOutCard from "./components/Card/LogCard/LogOutCard";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

const App = () => {
  const [showLogCard, setShowLogCard] = useState(false);

  const { isLoggedInValue, logedInHandler, errorSubmit, logedOutHandler } =
    useContext(CardContext);

  const { showCard, showCardOrderdHandler, hideCardOrderdHandler } =
    useContext(CardContext);

  const showCardLogHandler = () => {
    setShowLogCard(true);
  };

  const hideCardLogHandler = () => {
    setShowLogCard(false);
    errorSubmit();
  };

  return (
    <>
      {!isLoggedInValue && showLogCard && (
        <LogInCard onHideCard={hideCardLogHandler} onLogIn={logedInHandler} />
      )}
      {isLoggedInValue && showLogCard && (
        <LogOutCard
          onHideCard={hideCardLogHandler}
          onLogOut={logedOutHandler}
        />
      )}
      {showCard && (
        <Card
          onHideCard={hideCardOrderdHandler}
          logState={isLoggedInValue}
          onClickLog={showCardLogHandler}
          onLogIn={hideCardOrderdHandler}
        />
      )}
      <Header
        onShowOrderCard={showCardOrderdHandler}
        onShowLogCard={showCardLogHandler}
        loggedState={isLoggedInValue}
      />
      <main>
        <Meals />
      </main>
    </>
  );
};

export default App;
