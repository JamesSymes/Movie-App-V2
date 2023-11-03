// Confirmation.jsx
import React, { useContext } from 'react';
import { CartContext } from './CartProvider';
import '../styles/Confirmation.css';

const Confirmation = () => {
  const { cartItems, calculateTotal, calculateShipping, shippingOption } = useContext(CartContext);
  const cartTotal = calculateTotal();
  const shippingCost = calculateShipping();
  const orderTotal = cartTotal + shippingCost;

  // Generate a random order number for the sake of the example
  const orderNumber = Math.floor(Math.random() * 1000000);

  // Determine estimated shipping time based on shipping option
  const shippingTime = shippingOption === 'standard' ? '5-7' : '1-3';

  return (
    <div className="conformation-page-content">
      <div className="conformation-container">
        <div className="confirmation">
          <h2>Order Confirmation</h2>
          <p>Thank you for your purchase!</p>
          <p>Your order number is: {orderNumber}</p>
          <h3>Order Summary:</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.title} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <p>Shipping cost: ${shippingCost.toFixed(2)}</p>
          <p>Total: ${orderTotal.toFixed(2)}</p>
          <p>Your order will arrive in the next {shippingTime} business days.</p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;

