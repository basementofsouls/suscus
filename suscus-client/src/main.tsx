import { createContext, StrictMode } from "react";
import "./index.css";
import App from "./App.tsx";
import Store from "./store/store.ts";
import ReactDOM from "react-dom/client";

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({
  store,
});

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container missing in index.html");
}

const root = ReactDOM.createRoot(container);
root.render(
  <StrictMode>
    <Context.Provider value={{ store }}>
      <App />
    </Context.Provider>
  </StrictMode>
);
