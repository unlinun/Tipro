import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import { store } from "./state/store.js";
import { Provider } from "react-redux";

import "./styles/style.scss";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
