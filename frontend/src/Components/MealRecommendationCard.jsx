import { FaStar } from "react-icons/fa";
import { useCart } from "../Context/CartContext";
import "../styles/MealRecommendationCard.css";

export default function MealRecommendationCard({ meal, reason }) {
  const { addToCart } = useCart();

  return (
    <div className="meal-card">

      <div className="meal-image">

        <img
          src={meal.image}
          alt={meal.name}
        />

        <span
          className={
            meal.isVeg
              ? "veg-badge"
              : "nonveg-badge"
          }
        >
          {meal.isVeg ? "🟢 Veg" : "🔴 Non Veg"}
        </span>

      </div>

      <div className="meal-body">

        <h3>{meal.name}</h3>

        <p className="meal-category">
          {meal.category}
        </p>

        <div className="meal-rating">

          <FaStar />

          <span>{meal.rating || 4.5}</span>

        </div>

        <h2 className="meal-price">
          ₹{meal.price}
        </h2>

        <div className="ai-reason">
          ❤️ {reason}
        </div>

        <button
          className="meal-add-btn"
         onClick={() =>
  addToCart({
    ...meal,
    restaurant: meal.restaurant,
  })
}
        >
          + Add To Cart
        </button>

      </div>

    </div>
  );
}