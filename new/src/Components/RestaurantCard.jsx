import {
  FaHeart,
  FaStar,
  FaClock,
  FaMotorcycle,
  FaArrowRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="restaurant-card-link" >
    <div className="restaurant-card">

      <div className="restaurant-image">

       <img src={restaurant.logo} alt={restaurant.name} />

        <button className="favorite-btn">
          <FaHeart />
        </button>

        <div className="offer-badge">
          {restaurant.offer}
        </div>

      </div>

      <div className="restaurant-body">

        <span className="category">
          {restaurant.category}
        </span>

        <h3>{restaurant.name}</h3>

        <p className="cuisine">
          {restaurant.cuisine}
        </p>

        <div className="rating-row">

          <div className="rating-box">
            <FaStar />
            <span>{restaurant.rating}</span>
          </div>

          <span className="reviews">
            ({restaurant.reviews} reviews)
          </span>

        </div>

        <div className="restaurant-info">

          <div className="info-item">
            <FaClock />
            <span>{restaurant.time}</span>
          </div>

          <div className="info-item">

  {restaurant.delivery === "Free Delivery" ? (
    <FaMotorcycle />
  ) : (
    <span className="delivery-currency">₹</span>
  )}

  <span>{restaurant.delivery}</span>

</div>

        </div>

        <div className="price-row">

          <span className="price-label">
            Cost for Two
          </span>

          <span className="price">
            {restaurant.price}
          </span>

        </div>

        <button className="menu-btn">

          View Menu

          <FaArrowRight />

        </button>

      </div>

    </div>
    </Link>
  );
}

export default RestaurantCard;