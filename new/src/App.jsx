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
import Wishlist from "./pages/Wishlist";
import AdminLogin from "./admin/pages/AdminLogin";
import Dashboard from "./admin/pages/Dashboard";
import AdminLayout from "./admin/Layouts/AdminLayout";
import Coupons from "./admin/pages/Coupons";
import Messages from "./admin/pages/Messages";
import AdminOrders from "./admin/pages/AdminOrders";
import AdminRestaurants from "./admin/pages/AdminRestaurants";
import Customers from "./admin/pages/Customers";
import Settings from "./admin/pages/Settings";
import Menu from "./admin/pages/Menu";
import AdminProfile from "./admin/pages/AdminProfile";
function App() {
  return (
    <>
     

      <Routes>
       

  {/* Customer Routes */}

  <Route path="/" element={<Home />} />
  <Route path="/auth" element={<AuthPage />} />
  <Route path="/restaurants" element={<Restaurants />} />
  <Route path="/restaurant/:id" element={<RestaurantDetails />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/order-success" element={<OrderSuccess />} />
  <Route path="/orders" element={<Orders />} />
  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
  <Route path="/terms" element={<Terms />} />
  <Route path="/accessibility" element={<Accessibility />} />
  <Route path="/reset-password/:token" element={<ResetPassword />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/wishlist" element={<Wishlist />} />

  {/* Admin Login */}

  <Route path="/admin/login" element={<AdminLogin />} />

  {/* Admin Layout */}

  <Route path="/admin" element={<AdminLayout />}>

    <Route path="dashboard" element={<Dashboard />} />
    <Route path="restaurants" element={<AdminRestaurants />} />
    <Route path="orders" element={<AdminOrders />} />
    <Route path="customers" element={<Customers />} />
    <Route path="coupons" element={<Coupons />} />
    <Route path="messages" element={<Messages />} />
    <Route path="settings" element={<Settings />} />
    <Route path="menu" element={<Menu />} />
    <Route path="profile" element={<AdminProfile />} />

  </Route>








      </Routes>
    </>
  );
}

export default App;