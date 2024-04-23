import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./sass/index.scss";
import { BrowserRouter } from "react-router-dom";
import AudioProps from "./context/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AudioProps>
      <App />
    </AudioProps>
  </BrowserRouter>
);
