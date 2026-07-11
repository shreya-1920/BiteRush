import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../styles/Cart.css";
import CartItem from "../Components/CartItem";
import CartSummary from "../Components/CartSummary";
import DeliveryProgress from "../Components/DeliveryProgress";
import CouponSection from "../Components/CouponSection";
import RecommendedItems from "../Components/RecommendedItems";
import EmptyCart from "../Components/EmptyCart";
import { useCart } from "../Context/CartContext";



export default function Cart() {

    

const { cartItems } = useCart();
console.log("Cart Items:", cartItems);

    return (
        <>
            <Header />

            {
                cartItems.length === 0 ? (

                    <EmptyCart />

                ) : (

                    <section className="cart-page">

                        <div className="cart-container">

                            <h1 className="cart-title">
                                Your Cart
                            </h1>

                            <div className="cart-layout">

                                <div className="cart-left">

                                  {cartItems.map((item, index) => (
    <CartItem
        key={index}
        item={item}
    />
))}
                                    <DeliveryProgress />
                                    <CouponSection />
                                    <RecommendedItems />

                                </div>

                                <div className="cart-right">

                                    <CartSummary />

                                </div>

                            </div>

                        </div>

                    </section>

                )
            }

            <Footer />
        </>
    );
}
        