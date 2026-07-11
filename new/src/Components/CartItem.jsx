import { useCart } from "../Context/CartContext";
function CartItem({item}){
    const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
} = useCart();
    return(
        <>
      

<div className="cart-item">

    <button className="remove-btn"   onClick={() => removeFromCart(item.id)}>
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

        <button
    onClick={() => decreaseQuantity(item.id)}
>
    -
</button>

        <span>{item.quantity}</span>

        <button
    onClick={() => increaseQuantity(item.id)}
>
    +
</button>

    </div>

</div>



     
        
        </>
    );
}
export default CartItem;