import Header from "../Components/Header";
import Footer from "../Components/Footer";

import restaurants from "../data/restaurants";

import { useParams } from "react-router-dom";
import "../styles/RestaurantDetails.css";
import RestaurantHero from "../Components/RestaurantHero";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";

import { useEffect } from "react";

/*import {
  FaHeart,
  FaStar,
  FaMotorcycle,
} from "react-icons/fa";

import { IoTimeOutline } from "react-icons/io5";*/
import { menuData } from "../data/menuData";
import { FaHeart } from "react-icons/fa";

function RestaurantDetails() {
useEffect(() => {
  console.log("RestaurantDetails mounted");
  console.log(window.scrollY);
}, []);
    const {
  cartItems,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} = useCart();
   
  const { id } = useParams();
  const menuItems = menuData[id] || [];

  const restaurant = restaurants.find(
    (item) => item.id === Number(id)
  );

  if (!restaurant) {
    return <h2>Restaurant Not Found</h2>;
  }
  
 return (
    <>
     <Header />
     <RestaurantHero restaurant={restaurant} />

<main className="restaurant-details-page">

   

{/* ================= OFFERS ================= */}

<section className="offers-section">

  <div className="offers-container">

    <h2 className="section-title">
      Exclusive Offers
    </h2>
<p className="offer-subtitle">
    Save more on every order with our limited-time deals.
</p>
    <div className="offers-grid">

      <div className="offer-card">

        <h3>🎉 40% OFF</h3>

        <p>Use Code: BITERUSH40</p>

        <span>Terms Apply</span>

      </div>

      <div className="offer-card">

        <h3>🛵 Free Delivery</h3>

        <p>On Orders Above ₹299</p>

        <span>Limited Time</span>

      </div>

      <div className="offer-card">

        <h3>🍔 Buy 1 Get 1</h3>

        <p>On Selected Burgers</p>

        <span>Today Only</span>

      </div>

    </div>

  </div>

</section>
{/* ================= MENU ================= */}

<section className="menu-section">

  <div className="menu-tabs">

    <button className="active">Recommended</button>
    <button>Pizza</button>
    <button>Pasta</button>
    <button>Burgers</button>
    <button>Drinks</button>
    <button>Desserts</button>

  </div>

  <div className="menu-search">

    <input
      type="text"
      placeholder="🔍 Search dishes..."
    />

  </div>

</section>
<div className="menu-layout">

  {/* LEFT */}

  <div className="menu-items">

        {menuItems.map((item) => {

            const cartItem = cartItems.find(
    cart => Number(cart.productId) === Number(item.id)
);

            const quantity = cartItem ? cartItem.quantity : 0;
            console.log("Cart Items:", cartItems);
console.log("Current Item ID:", item.id);

            return (

                <div className="menu-card" key={item.id}>

                    <div className="menu-content">
                        <div className={item.veg ? "veg-badge" : "nonveg-badge"}>
                            {item.veg ? "🟢 Veg" : "🔴 Non Veg"}
                        </div>

                        {item.bestseller && <div className="best-badge">🔥 Bestseller</div>}

                        <h3>{item.name}</h3>

                        <div className="menu-meta">
                            <span>⭐ {item.rating}</span>
                            <span>({item.reviews})</span>
                            <span>•</span>
                            <span>{item.time}</span>
                        </div>

                        <div className="price-row">
                            <span className="new-price">₹{item.price}</span>
                            <span className="old-price">₹{item.oldPrice}</span>
                            <span className="discount-badge">15% OFF</span>
                        </div>

                        <p className="menu-desc">{item.description}</p>
                    </div>

                    <div className="menu-image">
                        <button className="wishlist-btn">
                            <FaHeart />
                        </button>

                        <img src={item.image} alt={item.name} />

                        {cartItem ? (
                            <div className="quantity-box">
                                <button onClick={() => decreaseQuantity(cartItem)}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => increaseQuantity(cartItem)}>+</button>
                            </div>
                        ) : (
                            <button className="rest-add-btn" onClick={() => addToCart(item)}>
                                ADD
                            </button>
                        )}
                    </div>
                </div>
            );
        })}

  </div>

  {/* RIGHT */}

  <div className="restaurant-sidebar">

  <div className="info-card">

    <div className="card-title">

    <span className="title-line"></span>

    <h3>Restaurant Information</h3>

</div>

    <div className="info-row">
        <div className="info-title">📍 Address</div>
        <div className="info-value">
            42 Food Street, Jaipur
        </div>
    </div>

    <div className="info-row">
        <div className="info-title">🕒 Hours</div>
        <div className="info-value">
            11 AM - 11 PM
        </div>
    </div>

    <div className="info-row">
        <div className="info-title">🛵 Delivery Fee</div>
        <div className="info-value">
            Free Delivery
        </div>
    </div>

    <div className="info-row">
        <div className="info-title">💰 Minimum Order</div>
        <div className="info-value">
            ₹199
        </div>
    </div>

</div>

<div className="review-card">

    <h3>Customer Reviews</h3>

   <div className="review-summary">

    <div className="rating-number">
        4.6
    </div>

    <div className="rating-info">

        <div className="review-stars">
            ⭐⭐⭐⭐⭐
        </div>

        <p>(1,240 Reviews)</p>

    </div>

</div>

    <div className="reviews-section">

        <div className="review">

            <div className="review-header">

                <img
                    src="https://i.pravatar.cc/50?img=1"
                    alt=""
                />

                <div>
                    <h4>Rahul Sharma</h4>
                    <span>2 days ago</span>
                </div>

            </div>

            <div className="review-stars">
                ⭐⭐⭐⭐⭐
            </div>

            <p>
                Amazing food and super fast delivery!
                Highly recommended.
            </p>

        </div>

      <div className="review">

    <div className="review-header">

        <img
            src="https://i.pravatar.cc/50?img=32"
            alt=""
        />

        <div>

            <h4>Riya Gupta</h4>

            <span>1 week ago</span>

        </div>

    </div>

    <div className="review-stars">
        ⭐⭐⭐⭐
    </div>

    <p>
        Nice ambience and tasty dishes.
        Will order again.
    </p>

</div>

      <div className="review">

    <div className="review-header">

        <img
            src="https://i.pravatar.cc/50?img=48"
            alt=""
        />

        <div>

            <h4>Ananya Singh</h4>

            <span>3 weeks ago</span>

        </div>

    </div>

    <div className="review-stars">
        ⭐⭐⭐⭐
    </div>

    <p>
        Loved the fries!
        Crispy and delicious.
    </p>

</div>
<button className="view-review-btn">

    View All Reviews

    <span>→</span>

</button>
    </div>

</div>
<div className="feature-box">

    <div className="feature-item">
        <span className="feature-icon">🏅</span>
        <h4>Best Quality</h4>
        <p>Always fresh</p>
    </div>

    <div className="feature-item">
        <span className="feature-icon">🛡️</span>
        <h4>Safe Packaging</h4>
        <p>Hygienic & secure</p>
    </div>

    <div className="feature-item">
        <span className="feature-icon">⚡</span>
        <h4>Fast Delivery</h4>
        <p>On time, always</p>
    </div>

</div>
    </div>
</div>
  


<section className="gallery-section">

    <h2 className="section-title">
        From The Kitchen
    </h2>

    <div className="gallery-grid">

        {restaurant.gallery.map((image,index)=>(

    <div
        className="gallery-card"
        key={index}
    >

        <img
            src={image}
            alt={`Gallery ${index}`}
        />

        <div className="gallery-overlay">

            <span>View Dish</span>

        </div>

    </div>

        ))}
    </div>

</section>


{/* ================= SIMILAR RESTAURANTS ================= */}

<section className="similar-section">

  <h2 className="section-title">
    You May Also Like
  </h2>

  <div className="similar-grid">

    {restaurants
      .filter(item => item.id !== restaurant.id)
      .slice(0,4)
      .map(item => (
      <Link
        key={item.id}
        to={`/restaurant/${item.id}`}
        className="similar-card"
      >
        <img
          src={item.banner}
          alt={item.name}
        />

        <div className="similar-content">
          <h3>{item.name}</h3>
          <p>{item.cuisine}</p>
          <span>⭐ {item.rating}</span>
        </div>
      </Link>
    ))}

  </div>

</section>
</main>

<Footer />
    </>
  );
}

export default RestaurantDetails;