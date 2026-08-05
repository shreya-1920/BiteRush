import { useEffect, useState } from "react";
import "../styles/Wishlist.css";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import {
  getWishlist,
  removeWishlist,
} from "../services/WishlistService";

const Wishlist = () => {

  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const res = await getWishlist();

      console.log(res.data);

      setWishlist(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (id) => {
    try {
      await removeWishlist(id);

      fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wishlist-page">

      <div className="wishlist-header">
        <h1>My Wishlist</h1>
        <p>Your favourite restaurants saved for later ❤️</p>
      </div>

      {wishlist.length === 0 ? (

        <div className="empty-wishlist">

          <FaHeart className="empty-icon" />

          <h2>Your Wishlist is Empty</h2>

          <p>
            Save your favourite dishes and restaurants to order later.
          </p>

          <Link to="/restaurants" className="browse-btn">
            Browse Restaurants
          </Link>

        </div>

      ) : (

        <div className="wishlist-grid">

          {wishlist.map((item) => (

            <div className="wishlist-card" key={item._id}>

              <img
                src={item.image}
                alt={item.restaurantName}
              />

              <div className="wishlist-content">

                <h3>{item.restaurantName}</h3>

                <p>{item.category}</p>

                <span>⭐ {item.rating}</span>

                <div className="wishlist-actions">

                  <Link
    to={`/restaurant/${item.restaurantId}`}
    className="cart-btn"
>
    <FaShoppingCart />
    View Menu
</Link>

                  <button
                    className="delete-btn"
                    onClick={() => handleRemove(item._id)}
                  >
                    <FaTrash />
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default Wishlist;