import { useState } from "react";
import {
  FaCamera,
  FaStar,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebookF,
  FaGlobe
  
} from "react-icons/fa";

import "../styles/Restaurant-panel.css";

function RestaurantProfile() {
const [isOpen, setIsOpen] = useState(true);
  const [restaurant, setRestaurant] = useState({

    name: "The Pizza House",
    owner: "John Doe",
    email: "pizzahouse@gmail.com",
    phone: "+91 9876543210",
    address: "MI Road, Jaipur",
    website: "www.thepizzahouse.com",
    instagram: "@thepizzahouse",
    facebook: "The Pizza House",
    opening: "09:00",
    closing: "23:00",

  });

  const handleChange = (e)=>{

    setRestaurant({

      ...restaurant,
      [e.target.name]:e.target.value

    });

  };

  return (

<div className="profile-page">

{/* COVER */}

<div className="profile-cover">

<button>

<FaCamera/>

Change Cover

</button>

</div>

{/* PROFILE */}

<div className="profile-card">

<div className="profile-logo">

🍕

</div>

<h2>{restaurant.name}</h2>

<div className="rating">

<FaStar/>

4.8 (254 Reviews)

</div>

<span className="verified">

✔ Verified Partner

</span>

<div className="status-container">

    <div>

        <label>Restaurant Status</label>

        <p className={isOpen ? "status-open" : "status-closed"}>
            {isOpen ? "🟢 OPEN" : "🔴 CLOSED"}
        </p>

    </div>

    <label className="toggle-switch">

        <input
            type="checkbox"
            checked={isOpen}
            onChange={() => setIsOpen(!isOpen)}
        />

        <span className="toggle-slider"></span>

    </label>

</div>

<div className="cuisines">

<span>Pizza</span>

<span>Italian</span>

<span>Fast Food</span>

</div>

</div>


{/* FORM */}

<div className="profile-form">

<h3>Restaurant Information</h3>

<div className="profile-grid">

<div>

<label>Restaurant Name</label>

<input
name="name"
value={restaurant.name}
onChange={handleChange}
/>

</div>

<div>

<label>Owner Name</label>

<input
name="owner"
value={restaurant.owner}
onChange={handleChange}
/>

</div>

<div>

<label>Opening Time</label>

<input
type="time"
name="opening"
value={restaurant.opening}
onChange={handleChange}
/>

</div>

<div>

<label>Closing Time</label>

<input
type="time"
name="closing"
value={restaurant.closing}
onChange={handleChange}
/>

</div>

</div>

<h3>Contact Information</h3>

<div className="profile-grid">

<div>

<label>Email</label>

<input
name="email"
value={restaurant.email}
onChange={handleChange}
/>

</div>

<div>

<label>Phone</label>

<input
name="phone"
value={restaurant.phone}
onChange={handleChange}
/>

</div>

<div className="full">

<label>Address</label>

<div className="address-box">

<input
name="address"
value={restaurant.address}
onChange={handleChange}
/>

<button>

<FaMapMarkerAlt/>

View Map

</button>

</div>

</div>

</div>

<h3>Gallery</h3>

<div className="gallery">

<div className="upload-box">

<FaCamera/>

<p>Upload Photo</p>

</div>

<div className="gallery-img"></div>

<div className="gallery-img"></div>

<div className="gallery-img"></div>

<div className="gallery-img"></div>

</div>

<h3>Social Links</h3>

<div className="profile-grid">

<div>

<label>Instagram</label>

<div className="icon-input">

<FaInstagram/>

<input
name="instagram"
value={restaurant.instagram}
onChange={handleChange}
/>

</div>

</div>

<div>

<label>Facebook</label>

<div className="icon-input">

<FaFacebookF/>

<input
name="facebook"
value={restaurant.facebook}
onChange={handleChange}
/>

</div>

</div>

<div className="full">

<label>Website</label>

<div className="icon-input">

<FaGlobe/>

<input
name="website"
value={restaurant.website}
onChange={handleChange}
/>

</div>

</div>

</div>

<button className="save-btn">

Save Changes

</button>

</div>

</div>

  );

}

export default RestaurantProfile;