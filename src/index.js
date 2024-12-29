import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import NavBar from "./components/NavBar.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <main className="[&::-webkit-scrollbar]:hidden root">
      <App />
    </main>
  </React.StrictMode>
);
