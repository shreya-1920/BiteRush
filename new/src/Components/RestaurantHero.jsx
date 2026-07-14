import { FaHeart, FaStar, FaMotorcycle } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";

import "../styles/RestaurantHero.css";
/*this is the jsx of specefic resturants hero*/
function RestaurantHero({ restaurant }) {
  return (
    <section className="details-hero">

      <div className="details-banner">

        <img
  src={restaurant.banner}
  alt={restaurant.name}
/>

        <div className="details-overlay"></div>

        <button className="details-favorite-btn">
          <FaHeart />
        </button>

      </div>

      <div className="details-header">

        <div className="details-logo">

          <img
  src={restaurant.logo}
  alt={restaurant.name}
/>

        </div>

        <div className="details-content">

          <h1>{restaurant.name}</h1>

          <p className="details-cuisine">
            {restaurant.cuisine}
          </p>
<p className="restaurant-tagline">
    Serving handcrafted burgers & fresh meals made with premium ingredients.
</p>
          <div className="details-meta">
<div className="details-chip rating-chip">
    <FaStar />
    <span>{restaurant.rating}</span>
    <span>({restaurant.reviews})</span>
</div>

<div className="details-chip time-chip">
    <IoTimeOutline />
    <span>{restaurant.time}</span>
</div>

<div className="details-chip delivery-chip">
    <FaMotorcycle />
    <span>{restaurant.delivery}</span>
</div>

<div className="details-chip price-chip">
    <span>{restaurant.price} for two</span>
</div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default RestaurantHero;