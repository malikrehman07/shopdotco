import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './Auth'
import axios from 'axios'

const CartContext = createContext()
const CartProvider = ({ children }) => {
    const { user, } = useAuthContext()
    const [cart, setCart] = useState([])
    const [isAppLoading, setIsAppLoading] = useState(false)

    const addToCart = async (cartItem) => {
        if (user?.uid) {
            try {
                const res = await axios.post("https://shop-co-nbni.vercel.app/cart/add", {
                    ...cartItem,
                    userId: user.uid,
                });
                const savedItem = res.data.cartItem;
                setCart(prev => [...prev, savedItem]);
                window.notify("Product added to cart!", "success");
            } catch (err) {
                console.error("Error adding to cart:", err);
                window.notify("Failed to add to cart", "error");
            }
        } else {
            const localCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
            localCart.push(cartItem);
            localStorage.setItem("guest_cart", JSON.stringify(localCart));
            setCart(localCart);
            window.notify("Product added to cart!", "success");
        }
    };



    const handleAddToCart = (product) => {
        const variant = product.variants?.[0];
        if (!variant) {
            return window.notify("No variant available", "error");
        }

        const cartItem = {
            productId: product._id,
            title: product.title,
            selectedVariant: variant,
            quantity: 1,
            image: product.imageUrls?.[0],
        };

        addToCart(cartItem);
    };


    const clearCart = async () => {
        if (user?.uid) {
            try {
                await axios.delete(`https://shop-co-nbni.vercel.app/cart/clear/${user.uid}`);
            } catch (err) {
                console.error("Error clearing cart:", err);
            }
        } else {
            localStorage.removeItem("guest_cart");
        }

        setCart([]);
    };



    const fetchCartItems = useCallback(async () => {
        setIsAppLoading(true);
        try {
            if (user?.uid) {
                const res = await axios.get(`https://shop-co-nbni.vercel.app/cart/${user.uid}`);
                setCart(res.data.cart);
            } else {
                const localCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
                setCart(localCart);
            }
        } catch (err) {
            console.error("Error fetching cart:", err);
        } finally {
            setIsAppLoading(false);
        }
    }, [user]);


    useEffect(() => {
        fetchCartItems();
    }, [fetchCartItems]);



    const removeFromCart = async (id) => {
        if (!id) return;

        if (user?.uid) {
            try {
                await axios.delete(`https://shop-co-nbni.vercel.app/cart/remove/${id}`);
                setCart(prev => prev.filter(item => item._id !== id));
                window.notify("Product removed successfully", "success");
            } catch (err) {
                console.error("Error removing item:", err);
                window.notify("Failed to remove product", "error");
            }
        } else {
            const localCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
            const indexToRemove = localCart.findIndex(item => item.productId === id);
            if (indexToRemove !== -1) {
                localCart.splice(indexToRemove, 1); // ✅ Remove only first match
                localStorage.setItem("guest_cart", JSON.stringify(localCart));
                setCart([...localCart]);
                window.notify("Product removed successfully", "success");
            } else {
                console.warn("Product not found in guest cart");
            }
        }
    };


    return (
        <CartContext.Provider value={{ cart, setCart, removeFromCart, handleAddToCart, clearCart, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => useContext(CartContext)

export default CartProvider
