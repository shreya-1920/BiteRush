
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./styles/global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(

    <>
      <BrowserRouter>
        <App />
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        newestOnTop
        theme="light"
      />
    </>
  
);