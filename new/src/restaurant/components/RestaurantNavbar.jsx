
import { useState } from "react";
import {  useEffect, useRef } from "react";
import {
    FaBell,
    
    FaSearch
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useSearch } from "../context/SearchContext";


import { getDashboard } from "../services/RestaurantDashboardServices";

function RestaurantNavbar()  {
  const { search, setSearch } = useSearch();
const location = useLocation();
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const restaurant = JSON.parse(localStorage.getItem("restaurant"));
useEffect(() => {

    function handleClickOutside(e){

        if(
            notificationRef.current &&
            !notificationRef.current.contains(e.target)
        ){

            setShowNotifications(false);

        }

    }

    document.addEventListener("mousedown",handleClickOutside);

    return ()=>{

        document.removeEventListener(
            "mousedown",
            handleClickOutside
        );

    };

},[]);
useEffect(() => {

    const fetchNotifications = async () => {

        try{

            const data = await getDashboard();

            setNotifications(data.notifications);

        }catch(err){

            console.log(err);

        }

    };

    fetchNotifications();

},[]);
const placeholders = {
  "/restaurant/dashboard": "Search dashboard...",
  "/restaurant/orders": "Search Order ID or Customer...",
  "/restaurant/menu": "Search dishes...",
  "/restaurant/analytics": "Search analytics...",
  "/restaurant/profile": "Search restaurant profile...",
};

const placeholder =
  placeholders[location.pathname] || "Search...";

  useEffect(() => {
    setSearch("");
}, [location.pathname]);
  return (
    <header className="rp-navbar">

    

      <div className="rp-navbar-right">

        {/* Search */}

        <div className="rp-navbar-search">

          <FaSearch className="rp-navbar-search-icon" />

<input
  type="text"
  placeholder={placeholder}
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

        </div>

        {/* Notification */}

    <div
  className="rp-notification"
  ref={notificationRef}
>
  <button
    className="notification-btn"
    onClick={() =>
      setShowNotifications(!showNotifications)
    }
  >
    <FaBell />

    {notifications.length > 0 && (
      <span className="notification-badge">
        {notifications.length > 99
          ? "99+"
          : notifications.length}
      </span>
    )}
  </button>

  <div
    className={`notification-dropdown ${
      showNotifications ? "show" : ""
    }`}
  >
    <div className="notification-header">
      <h4>Notifications</h4>
    </div>

    {notifications.length > 0 ? (
      notifications.map((item) => (
        <div
          key={item._id}
          className="notification-item"
        >
          <h5>
            {item.status === "Pending"
              ? "🛒 New Order"
              : item.status === "Delivered"
              ? "💰 Payment Received"
              : item.status === "Cancelled"
              ? "❌ Order Cancelled"
              : "📦 Order Updated"}
          </h5>

          <p>
            {item.name} • ₹{item.total}
          </p>

          <span>
            {new Date(item.createdAt).toLocaleString()}
          </span>
        </div>
      ))
    ) : (
      <div className="notification-empty">
        No notifications yet.
      </div>
    )}
  </div>
</div>
        

  {/* Profile */}

<div className="rp-profile">

    <div className="rp-avatar">

       <img
    src={restaurant?.logo || "/images/default-restaurant.png"}
    alt={restaurant?.name}
/>

    </div>

    <div className="rp-user">

       <h4>{restaurant?.name}</h4>

        <span>Restaurant Owner</span>

    </div>

</div>


      </div>

    </header>
  );
}

export default RestaurantNavbar;