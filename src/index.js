import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactFlowProvider } from "react-flow-renderer";
import { DnDProvider } from "./componentes/FlowDesignerPage/Recursos/DnDContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ReactFlowProvider>
      {" "}
      {/*importante */}
      <DnDProvider>
        <App />
      </DnDProvider>
    </ReactFlowProvider>
  </React.StrictMode>
);

reportWebVitals();
