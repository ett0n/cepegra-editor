import React, { useState, useRef } from "react";
import { OrthographicCamera} from "@react-three/drei";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);