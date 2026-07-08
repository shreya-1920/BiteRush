import { Link } from "react-router-dom";
import {
    FaArrowRight,
    FaPizzaSlice,
    FaBirthdayCake,
    FaFish,
} from "react-icons/fa";

import emptyCart from "../assets/images/empty-cart.png";

import "../styles/Cart.css";

function EmptyCart() {

    return (

        <section className="empty-cart">

            <div className="empty-cart-content">

                <img
                    src={emptyCart}
                    alt="Empty Cart"
                    className="empty-cart-image"
                />

                <h1>
                    Your cart is feeling a bit lonely.
                </h1>

                <p>
                    Let's find something delicious to fill it up.
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

                <span className="trending-heading">
                    Trending Near You
                </span>

                <div className="trending-tags">

                    <div className="tag">
                        <FaPizzaSlice />
                        Artisan Pizza
                    </div>

                    <div className="tag">
                        <FaBirthdayCake />
                        Fine Pastries
                    </div>

                    <div className="tag">
                        <FaFish />
                        Sushi
                    </div>

                </div>

            </div>

        </section>

    );
}

export default EmptyCart;