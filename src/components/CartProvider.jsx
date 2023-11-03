// CartProvider.jsx
import React, { useState } from 'react';

export const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingOption, setShippingOption] = useState('standard');

  const addToCart = (movie) => {
    const existingItem = cartItems.find(item => item.id === movie.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === movie.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...movie, quantity: 1 }]);
    }
  };

  const removeFromCart = (movieId) => {
    const existingItem = cartItems.find(item => item.id === movieId);
    if (existingItem && existingItem.quantity > 1) {
      setCartItems(cartItems.map(item =>
        item.id === movieId ? { ...item, quantity: item.quantity - 1 } : item
      ));
    } else {
      setCartItems(cartItems.filter(item => item.id !== movieId));
    }
  };

  const calculateShipping = () => {
    if(shippingOption === "standard") {
      return 5.00;
    } else {
      return 10.00;
    }
  };

   // Here we define the calculateTotal function
   const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, shippingOption, setShippingOption, calculateShipping, calculateTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

