import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import { store } from "./state/store.js";
import { Provider } from "react-redux";
import { persistStore } from "reduxjs-toolkit-persist";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./styles/style.scss";

const queryClient = new QueryClient();

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <App />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
