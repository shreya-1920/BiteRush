import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import {
    getCart,
    addCart,
    updateCart,
    removeCart
} from "../services/cartServices";
import { toast } from "react-toastify";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {

const [cartItems, setCartItems] = useState([]);
const clearCartState = () => {
    setCartItems([]);
};
const addToCart = async (item) => {

    console.log("Item received:", item);

    const token = localStorage.getItem("token");

    // ================================
    // GUEST USER
    // ================================
    if (!token) {

        const guestCart =
            JSON.parse(localStorage.getItem("guestCart")) || [];

        const productId = item._id || item.id;

        const existingItem = guestCart.find(
            (cartItem) =>
                String(cartItem.productId) === String(productId)
        );

        let updatedCart;

        if (existingItem) {

            updatedCart = guestCart.map((cartItem) =>
                String(cartItem.productId) === String(productId)
                    ? {
                        ...cartItem,
                        quantity: cartItem.quantity + 1
                    }
                    : cartItem
            );

        } else {

            updatedCart = [
                ...guestCart,
                {
                    productId: productId,
                    restaurant: item.restaurant,
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    quantity: 1
                }
            ];
        }

        localStorage.setItem(
            "guestCart",
            JSON.stringify(updatedCart)
        );

        setCartItems(updatedCart);

        toast.success("Added to Cart!");

        return;
    }

    // ================================
    // LOGGED-IN USER
    // ================================
    try {

        const res = await addCart({
            restaurant: item.restaurant,
            productId: item._id || item.id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: 1,
        });

        console.log("API Response:", res);

        await fetchCart();

        toast.success("Added to Cart!");

    } catch (err) {

        console.log(
            "Error:",
            err.response?.data || err
        );

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

    const token = localStorage.getItem("token");

    if (token) {
        fetchCart();
    } else {

        const guestCart =
            JSON.parse(localStorage.getItem("guestCart")) || [];

        setCartItems(guestCart);
    }

}, []);
useEffect(() => {
  console.log("Cart State:", cartItems);
}, [cartItems]);
    

    

   

   
const increaseQuantity = async (item) => {

    const token = localStorage.getItem("token");

    // ================================
    // GUEST USER
    // ================================
    if (!token) {

        const guestCart =
            JSON.parse(localStorage.getItem("guestCart")) || [];

        const updatedCart = guestCart.map((cartItem) =>
            String(cartItem.productId) === String(item.productId)
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity + 1
                }
                : cartItem
        );

        localStorage.setItem(
            "guestCart",
            JSON.stringify(updatedCart)
        );

        setCartItems(updatedCart);

        return;
    }

    // ================================
    // LOGGED-IN USER
    // ================================
    try {

        await updateCart(
            item._id,
            item.quantity + 1
        );

        await fetchCart();

    } catch (err) {

        console.log(err);

    }
};

const decreaseQuantity = async (item) => {

    const token = localStorage.getItem("token");

    // ================================
    // GUEST USER
    // ================================
    if (!token) {

        const guestCart =
            JSON.parse(localStorage.getItem("guestCart")) || [];

        let updatedCart;

        // If quantity is 1, remove the item
        if (item.quantity === 1) {

            updatedCart = guestCart.filter(
                (cartItem) =>
                    String(cartItem.productId) !==
                    String(item.productId)
            );

        } else {

            // Otherwise decrease quantity
            updatedCart = guestCart.map(
                (cartItem) =>
                    String(cartItem.productId) ===
                    String(item.productId)
                        ? {
                            ...cartItem,
                            quantity: cartItem.quantity - 1
                        }
                        : cartItem
            );
        }

        localStorage.setItem(
            "guestCart",
            JSON.stringify(updatedCart)
        );

        setCartItems(updatedCart);

        return;
    }

    // ================================
    // LOGGED-IN USER
    // ================================
    try {

        if (item.quantity === 1) {

            await removeCart(item._id);

        } else {

            await updateCart(
                item._id,
                item.quantity - 1
            );

        }

        await fetchCart();

    } catch (err) {

        console.log(err);

    }
};

const removeFromCart = async (item) => {

    const token = localStorage.getItem("token");

    // ================================
    // GUEST USER
    // ================================
    if (!token) {

        const guestCart =
            JSON.parse(localStorage.getItem("guestCart")) || [];

        const updatedCart = guestCart.filter(
            (cartItem) =>
                String(cartItem.productId) !==
                String(item.productId)
        );

        localStorage.setItem(
            "guestCart",
            JSON.stringify(updatedCart)
        );

        setCartItems(updatedCart);

        toast.info("Item removed from cart.");

        return;
    }

    // ================================
    // LOGGED-IN USER
    // ================================
    try {

        await removeCart(item._id);

        await fetchCart();

    } catch (err) {

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
    clearCartState,
    fetchCart
  }}
>
            {children}
        </CartContext.Provider>

    );
};

export const useCart = () => useContext(CartContext);