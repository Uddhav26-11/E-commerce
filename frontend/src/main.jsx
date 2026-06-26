import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ShopContextProvider from "./context/ShopContext";

try {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </React.StrictMode>
  );
} catch (err) {
  document.getElementById("root").innerHTML =
    "<pre style='color:red; padding:20px; white-space:pre-wrap;'>" +
    (err && err.stack ? err.stack : String(err)) +
    "</pre>";
}