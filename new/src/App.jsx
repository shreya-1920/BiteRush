import { Routes, Route } from "react-router-dom";


import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import Restaurants from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Accessibility from "./pages/Accessibility";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
function App() {
  return (
    <>
     

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/about" element={<About />} />
           <Route path="/contact" element={<Contact />} />
           <Route path="/order-success" element={<OrderSuccess />} />
           <Route path="/orders" element={<Orders />} />
           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
           <Route path="/terms" element={<Terms />} />
           <Route path="/accessibility" element={<Accessibility />} />
          <Route
    path="/reset-password/:token"
    element={<ResetPassword />}/>
    <Route path="/profile" element={<Profile />} />





      </Routes>
    </>
  );
}

export default App;