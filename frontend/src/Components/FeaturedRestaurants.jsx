
import {
FaStar,
FaClock,
FaArrowRight,
FaCheck
} from "react-icons/fa";
import Container from "react-bootstrap/Container";
import burgerImg from "../assets/images/restaurant-1.png";
import pizzaImg from "../assets/images/restaurant-2.png";
import saladImg from "../assets/images/restaurant-3.png";
import ramenImg from "../assets/images/restaurant-4.png";
 
function FeaturedRestaurants(){
    const restaurants = [
  {
    id: 1,
    image: burgerImg,
    badge: "Top Rated",
    name: "The Smokehouse Grill",
    cuisine: "American • Burgers • BBQ",
    rating: "4.9",
    reviews: "1240",
    delivery: "18–25 min",
    offer: "Free delivery",
  },

  {
    id: 2,
    image: pizzaImg,
    badge: "Popular",
    name: "Napoli Express",
    cuisine: "Italian • Pizza • Pasta",
    rating: "4.7",
    reviews: "894",
    delivery: "20–30 min",
    offer: "$1.99 delivery",
  },

  {
    id: 3,
    image: ramenImg,
    badge: "New",
    name: "Sakura Kitchen",
    cuisine: "Japanese • Sushi • Ramen",
    rating: "4.8",
    reviews: "672",
    delivery: "25–35 min",
    offer: "Free delivery",
  },

  {
    id: 4,
    image: saladImg,
    badge: "Trending",
    name: "Green Bowl Co.",
    cuisine: "Healthy • Salads • Bowls",
    rating: "4.6",
    reviews: "510",
    delivery: "15–20 min",
    offer: "Free delivery",
  },
];

return(

<section className="br-featured-restaurants">

<Container>

<div className="section-header">

<div>

<span className="section-tag">
HAND-PICKED FOR YOU
</span>

<h2>
Featured Restaurants
</h2>

</div>

<a href="#" className="view-all">
View All <FaArrowRight />
</a>

</div>

<div className="br-restaurant-grid">

{restaurants.map((restaurant)=>(

<div
className="br-restaurant-card"
key={restaurant.id}
>

<div className="br-restaurant-image">

<img
src={restaurant.image}
alt={restaurant.name}
/>

<span
className={`br-restaurant-badge ${restaurant.badge
  .toLowerCase()
  .replace(" ", "-")}`}
>
    {restaurant.badge}
</span>

</div>

<div className="br-restaurant-content">

<h3>
{restaurant.name}
</h3>

<p className="br-cuisine">
{restaurant.cuisine}
</p>

<div className="br-restaurant-info">

<div>

<FaStar className="star"/>

<span>
{restaurant.rating}
</span>

<span className="reviews">
({restaurant.reviews})
</span>

</div>

<div>

<FaClock />

<span>
{restaurant.delivery}
</span>

</div>

</div>

<div className="br-restaurant-footer">

<div className="br-offer">

<FaCheck />

<span>
{restaurant.offer}
</span>

</div>

<a href="#">

View Menu

<FaArrowRight />

</a>

</div>

</div>

</div>

))}

</div>

</Container>

</section>
)
}
export default FeaturedRestaurants;