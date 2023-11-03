// Payment.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Payment.css';

const Payment = () => {
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCardInfo({
      ...cardInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/review'); // Navigate to Review page
  };

  return (
    <div className="payment-page-content"> {/* Add the wrapping div with the desired CSS class */}
      <div className="payment">
        <h2>Payment</h2>
        <p>IMPORTANT: This is a mock payment form. No actual payment will be processed.But please don't enter real card detail. It's just for demonstrational purposes.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Card Number:
            <input type="text" name="cardNumber" value={cardInfo.cardNumber} onChange={handleInputChange} required />
          </label>
          <label>
            Expiry Date:
            <input type="text" name="expiryDate" value={cardInfo.expiryDate} onChange={handleInputChange} required />
          </label>
          <label>
            CVV:
            <input type="text" name="cvv" value={cardInfo.cvv} onChange={handleInputChange} required />
          </label>
          <label>
            Cardholder Name:
            <input type="text" name="cardName" value={cardInfo.cardName} onChange={handleInputChange} required />
          </label>
          <input type="submit" value="Continue to Review" />
        </form>
      </div>
    </div>
  );
};

export default Payment;


