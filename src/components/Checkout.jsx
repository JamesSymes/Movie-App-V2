// Checkout.jsx
import React, { useContext, useState } from 'react';
import { CartContext } from './CartProvider';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/Checkout.css';

const Checkout = () => {
  const { shippingOption, setShippingOption, calculateShipping, calculateTotal } = useContext(CartContext);
  const shippingCost = calculateShipping();
  const cartTotal = calculateTotal();
  const total = cartTotal + shippingCost;

  const navigate = useNavigate(); // Use the useNavigate hook

  const [userInfo, setUserInfo] = useState({
    name: '',
    address: ''
  });

  const handleShippingChange = (e) => {
    setShippingOption(e.target.value);
  };

  const handleInputChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    navigate('/payment'); // Navigate to Payment page
  };

  return (
    <div className="checkout-page-content"> {/* Add the wrapper div with class name */}
      <div className="checkout"> {/* Existing content */}
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={userInfo.name} onChange={handleInputChange} required />
          </label>
          <label>
            Address:
            <input type="text" name="address" value={userInfo.address} onChange={handleInputChange} required />
          </label>
          <label>
            Shipping Method:
            <select name="shippingMethod" value={shippingOption} onChange={handleShippingChange}>
              <option value="standard">Standard - 5-7 Business Days: $5.00</option>
              <option value="express">Express - 1-3 Business Days: $10.00</option>
            </select>
          </label>
          <p>Shipping cost: ${shippingCost.toFixed(2)}</p>
          <p>Cart: ${cartTotal.toFixed(2)}</p>
          <p>Total: ${total.toFixed(2)}</p>
          <input type="submit" value="Continue to Payment" />
        </form>
      </div>
    </div>
  );
};

export default Checkout;

