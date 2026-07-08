import { cartItems } from "../data/cartData";
function CartItem(){
    return(
        <>
        <div className="cart-items">

{cartItems.map(item=>(

<div className="cart-item" key={item.id}>
    <button className="remove-btn">
        ✕
    </button>


    <img
     className="cart-item-image"
        src={item.image}
        alt={item.name}
    />

    <div className="cart-item-info">

        <h2>{item.name}</h2>

        <p>{item.description}</p>

        <h3>₹{item.price}</h3>

    </div>

    <div className="cart-item-actions">

        <button>-</button>

        <span>{item.quantity}</span>

        <button>+</button>

    </div>

</div>

))}

</div>



     
        
        </>
    );
}
export default CartItem;