import deliveryScooter from "../assets/images/food-scooter.png";
function DeliveryProgress(){
    return(
        <>
       <div className="delivery-card">

    <img
          src={deliveryScooter}
        alt="Delivery"
    />

    <div className="delivery-content">

        <h3>Almost There! 🚀</h3>

        <p>
            Spend <strong>₹150</strong> more to unlock
            <strong> FREE Delivery</strong>
        </p>

        <div className="progress-bar">

            <div className="progress-fill"></div>

        </div>

    </div>

</div>
        </>
    );
}
export default DeliveryProgress;