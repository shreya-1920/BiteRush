import restaurants from "../data/restaurants";
import SmallRestaurantCard from "./SmallRestaurantCard";


function RecommendedItems() {
  return (
    <>
      <h2 className="section-title">
        Recommended For You
      </h2>

      <div className="recommend-grid">
        {restaurants
  .filter((restaurant) => restaurant.id !== 1)
  .slice(0, 4)
  .map((restaurant) => (
    <SmallRestaurantCard
      key={restaurant.id}
      restaurant={restaurant}
    />
))}
       
       
      </div>
    </>
  );
}

export default RecommendedItems;