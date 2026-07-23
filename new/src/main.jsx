import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { CartProvider } from "./Context/CartContext";
import { LocationProvider } from "./context/LocationContext";
import { SearchProvider } from "./admin/context/SearchContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./styles/global.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ScrollToTop from "./Components/ScrollToTop";

window.history.scrollRestoration = "manual";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SearchProvider>
    <CartProvider>
      <LocationProvider>
        <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </LocationProvider>
    </CartProvider>

    <ToastContainer
      position="top-right"
      autoClose={2500}
      newestOnTop
      theme="light"
    />
  </SearchProvider>
);