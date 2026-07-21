import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import {
    getCart,
    addCart,
    updateCart,
    removeCart
} from "../services/CartServices";
import { toast } from "react-toastify";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {

const [cartItems, setCartItems] = useState([]);
const clearCartState = () => {
    setCartItems([]);
};
const addToCart = async (item) => {

    console.log("Item received:", item);

    try {

        const res = await addCart({

            productId: item.id,   // We'll check this after seeing the console
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: 1,

        });

        console.log("API Response:", res);

        await fetchCart();

        toast.success("Added to Cart!");

    }

    catch (err) {

        console.log("Error:", err.response?.data || err);

        toast.error("Failed to add item.");

    }

};
const fetchCart = async () => {
  try {
    const res = await getCart();

  console.log(JSON.stringify(res.data.cart, null, 2));

    setCartItems(res.data.cart);

  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  const token = localStorage.getItem("token"); // customer token

  if (!token) return;

  fetchCart();
}, []);
useEffect(() => {
  console.log("Cart State:", cartItems);
}, [cartItems]);
    

    

   

   
const increaseQuantity = async (item) => {

    try{

        await updateCart(

            item._id,

            item.quantity + 1

        );

        fetchCart();

    }

    catch(err){

        console.log(err);

    }

};

const decreaseQuantity = async (item) => {

    try{

        if(item.quantity===1){

            await removeCart(item._id);

        }

        else{

            await updateCart(

                item._id,

                item.quantity-1

            );

        }

        fetchCart();

    }

    catch(err){

        console.log(err);

    }

};

const removeFromCart = async (item) => {

    try{

        await removeCart(item._id);

        fetchCart();

    }

    catch(err){

        console.log(err);

    }

};
    return (
<CartContext.Provider
  value={{
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCartState
  }}
>
            {children}
        </CartContext.Provider>

    );
};

export const useCart = () => useContext(CartContext);