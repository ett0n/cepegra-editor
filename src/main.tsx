import React from "react";
import ReactDOM from "react-dom/client";
// l'app de base
import App from "./App";
// composant drag and drop
import DragDrop from './components/dragndrop/DragDrop';
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    {/* <DragDrop /> */}
  </React.StrictMode>
);
