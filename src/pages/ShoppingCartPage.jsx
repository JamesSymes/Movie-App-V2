// ShoppingCartPage.jsx
import React, { useContext } from 'react';
import { CartContext } from '../components/CartProvider';
import '../styles/ShoppingCartPage.css';

const ShoppingCartPage = () => {
  const { cartItems, removeFromCart, calculateTotalPrice } = useContext(
    CartContext
  );

  const handleRemoveFromCart = (movieId) => {
    removeFromCart(movieId);
  };

  return (
    <div className="shopping-cart-page">
      <h1>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is currently empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title} className="item-image"/>
              <div className="item-details">
                <h2 className="item-title">{item.title}</h2>
                <p className="item-price">${item.price}</p>
                <button className="remove-button" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="total-price">
            <p>Total: ${calculateTotalPrice()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartPage;
