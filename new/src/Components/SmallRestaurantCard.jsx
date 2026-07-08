import { FaStar, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Cart.css";

function SmallRestaurantCard({ restaurant }) {
  return (
    <Link
      to={`/restaurant/${restaurant.id}`}
      className="small-card-link"
    >
      <div className="small-card">

        <img
          src={restaurant.banner}
          alt={restaurant.name}
        />

        <div className="small-card-body">

          <span className="small-category">
            {restaurant.category}
          </span>

          <h3>{restaurant.name}</h3>

          <p>{restaurant.cuisine}</p>

          <div className="small-info">

            <span>
              <FaStar /> {restaurant.rating}
            </span>

            <span>
              <FaClock /> {restaurant.time}
            </span>

          </div>

          <button className="small-btn">
            View Menu
          </button>

        </div>

      </div>
    </Link>
  );
}

export default SmallRestaurantCard;