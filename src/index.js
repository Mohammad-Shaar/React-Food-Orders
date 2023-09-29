import ReactDOM from "react-dom/client";
import CardProvider from "./store/CardProvider";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CardProvider>
    <App />
  </CardProvider>
);
