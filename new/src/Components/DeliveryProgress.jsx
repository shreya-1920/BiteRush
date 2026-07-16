import deliveryScooter from "../assets/images/food-scooter.png";
import { useCart } from "../Context/CartContext";
function DeliveryProgress(){
    const { cartItems } = useCart();

const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
);

const target = 500; // Free delivery after ₹500

const remaining = Math.max(target - subtotal, 0);

const progress = Math.min((subtotal / target) * 100, 100);
    return(
        <>
       <div className="delivery-card">

    <img
          src={deliveryScooter}
        alt="Delivery"
    />

    <div className="delivery-content">

        <h3>Almost There! 🚀</h3>
        {/* Message about remaining amount or unlocked delivery */}
        {remaining > 0 ? (
            <p>
                Spend <strong>₹{remaining}</strong> more to unlock
                <strong> FREE Delivery</strong>
            </p>
        ) : (
            <p>
                🎉 <strong>Congratulations!</strong> Free Delivery Unlocked
            </p>
        )}

        <div className="progress-bar">

           <div
    className="progress-fill"
    style={{ width: `${progress}%` }}
></div>

        </div>

 

        </div>
</div>
        </>
    );
}
export default DeliveryProgress;