import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import {
    getCart,
    addCart
} from "../services/CartServices";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {

const [cartItems, setCartItems] = useState([]);

const fetchCart = async () => {

    try{

        const res = await getCart();

        setCartItems(res.data.cart);

    }

    catch(err){

        console.log(err);

    }

};
useEffect(() => {

    fetchCart();

}, []);
    

    

   

       const addToCart = async (item) => {

    try {

        await addCart({

            productId: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: 1

        });

        fetchCart();

    }

    catch (err) {

        console.log(err);

    }

};
const increaseQuantity = (id) => {

    setCartItems(prev =>
        prev.map(item =>
            item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        )
    );

};

const decreaseQuantity = (id) => {

    setCartItems(prev =>
        prev
            .map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter(item => item.quantity > 0)
    );

};

const removeFromCart = (id) => {

    setCartItems(prev =>
        prev.filter(item => item.id !== id)
    );

};

    return (

       <CartContext.Provider
value={{
cartItems,
setCartItems,
addToCart,
increaseQuantity,
decreaseQuantity,
removeFromCart
}}
>
            {children}
        </CartContext.Provider>

    );
};

export const useCart = () => useContext(CartContext);