
import { useState } from "react";
import {  useEffect, useRef } from "react";
import {
    FaBell,
    
    FaSearch
} from "react-icons/fa";

function RestaurantNavbar() {
  
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef(null);
    const notifications = [
    {
        id: 1,
        title: "New Order Received",
        message: "Order #1056 has been placed.",
        time: "2 min ago"
    },
    {
        id: 2,
        title: "Payment Received",
        message: "₹540 received successfully.",
        time: "15 min ago"
    },
    {
        id: 3,
        title: "New Review",
        message: "Pizza Palace received a 5⭐ review.",
        time: "30 min ago"
    }
];
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
  return (
    <header className="rp-navbar">

    

      <div className="rp-navbar-right">

        {/* Search */}

        <div className="rp-navbar-search">

          <FaSearch className="rp-navbar-search-icon" />

          <input
            type="text"
            placeholder="Search..."
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

        <FaBell/>

        {

            notifications.length>0 && (

               <span className="notification-badge">
    {notifications.length > 99
        ? "99+"
        : notifications.length}
</span>

            )

        }

    </button>

    {

        showNotifications && (

            <div className="notification-dropdown">

                <div className="notification-header">

                    <h4>

                        Notifications

                    </h4>

                </div>

                {

                    notifications.map(item=>(

                        <div
                            key={item.id}
                            className="notification-item"
                        >

                            <h5>{item.title}</h5>

                            <p>{item.message}</p>

                            <span>{item.time}</span>

                        </div>

                    ))

                }

            </div>

        )

    }

</div>

        {/* Profile */}

  {/* Profile */}

<div className="rp-profile">

    <div className="rp-avatar">

        <img
            src="/images/restaurant-logo.png"
            alt="Restaurant"
        />

    </div>

    <div className="rp-user">

        <h4>BiteRush</h4>

        <span>Restaurant Owner</span>

    </div>

</div>


      </div>

    </header>
  );
}

export default RestaurantNavbar;