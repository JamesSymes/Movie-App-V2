// Cart.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartProvider';
import '../styles/Cart.css';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  // Calculating total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page-content">
      <div className="cart-container">
      <h2 className="cart-heading">Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty. <Link to="/home">Go back to shopping.</Link></p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-container">
                <div className="cart-item">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    alt={item.title}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <p className="cart-item-title">{item.title}</p>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                    <div className="cart-item-actions">
                      <div className="quantity-buttons">
                        <button onClick={() => addToCart(item)}>+</button>
                        <button onClick={() => removeFromCart(item.id)}>-</button>
                      </div>
                    </div>
                    <p className="cart-item-subtotal">
                      Subtotal ({item.quantity} item): ${(
                        item.price * item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="cart-total">Total: ${totalPrice.toFixed(2)}</div>
        )}
        {cartItems.length > 0 && (
          <Link to="/checkout" className="checkout-button">Proceed to checkout</Link>
        )}
      </div>
    </div>
  );
};

export default Cart;