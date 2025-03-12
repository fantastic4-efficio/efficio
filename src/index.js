import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; // ✅ Import BrowserRouter
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Ensure Bootstrap is loaded
import "bootstrap/dist/js/bootstrap.bundle.min"; // ✅ Bootstrap JavaScript

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Wrap App in BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root") // ✅ Ensure this matches your HTML file
);
