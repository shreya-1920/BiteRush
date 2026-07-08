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

            <div className="details-chip">
              <FaStar />
              <span className="hero-chip rating-card">{restaurant.rating}</span>
              <span>({restaurant.reviews})</span>
            </div>

            <div className="details-chip">
              <IoTimeOutline />
              <span className="hero-chip time-chip">{restaurant.time}</span>
            </div>

            <div className="details-chip">
              <FaMotorcycle />
              <span className="hero-chip delivery-chip">{restaurant.delivery}</span>
            </div>

            <div className="details-chip">
              <span className="hero-chip price-chip">{restaurant.price} for two</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default RestaurantHero;