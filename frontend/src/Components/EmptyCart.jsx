import { Link } from "react-router-dom";
import { FaArrowRight, FaShoppingCart } from "react-icons/fa";

import heroFood from "../assets/images/food-hero.png";

import "../styles/Cart.css";

function EmptyCart() {
    return (
        <section className="empty-cart">

            <div className="empty-cart-card">

                {/* Left Side */}

                <div className="empty-cart-left">

                    <div className="hero-blob"></div>

                    <img
                        src={heroFood}
                        alt="Delicious Food"
                        className="hero-food-image"
                    />

                </div>

                {/* Right Side */}

                <div className="empty-cart-right">

                    <div className="cart-badge">
                        <FaShoppingCart />
                        Empty Cart
                    </div>

                    <h1>
                        Your next delicious
                        <br />
                        meal is waiting.
                    </h1>

                    <p>
                        Browse our restaurants, discover your favorites,
                        and we'll deliver them fresh to your doorstep.
                    </p>

                    <div className="cart-buttons">

                        <Link
                            to="/restaurants"
                            className="explore-btn"
                        >
                            Start Exploring
                            <FaArrowRight />
                        </Link>

                        <Link
                            to="/orders"
                            className="orders-btn"
                        >
                            View Recent Orders
                        </Link>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default EmptyCart;