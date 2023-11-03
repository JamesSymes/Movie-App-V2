// Review.jsx
import React, { useContext } from 'react';
import { CartContext } from './CartProvider';
import { useNavigate } from 'react-router-dom';
import '../styles/Review.css';

const Review = () => {
  const { cartItems, shippingOption, calculateShipping, calculateTotal } = useContext(CartContext);
  const shippingCost = calculateShipping();
  const cartTotal = calculateTotal();
  const total = cartTotal + shippingCost;
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate('/confirmation'); // Navigate to Confirmation page
  };

  return (
    <div className="review-page-content">
      <div className="review-container">
        <h2>Review Your Order</h2>

        <div>
          <h3>Shipping Information</h3>
          <p>Shipping Method: {shippingOption}</p>
          <p>Shipping Cost: ${shippingCost.toFixed(2)}</p>
        </div>

        <div>
          <h3>Payment Information</h3>
          <p>Card Number: **** **** **** 1234</p>
        </div>

        <div>
          <h3>Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>{item.title} - ${item.price.toFixed(2)} x {item.quantity}</p>
            </div>
          ))}
          <p>Cart Total: ${cartTotal.toFixed(2)}</p>
          <p>Total Cost: ${total.toFixed(2)}</p>
        </div>

        <button onClick={handleOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default Review;


