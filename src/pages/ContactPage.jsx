// ContactPage.jsx
import React from 'react';
import '../styles/ContactPage.css'; // Import the CSS file for styling

const ContactPage = () => {
  return (
    <div className="contact-page-content"> {/* Added the "contact-page-content" class */}
      <div className="contact-page">
        <h2 className="contact-page-title">Contact</h2>
        <p className="contact-page-description">This is a mockup contact page for demonstration purposes only.</p>
        
        <div className="contact-page-info">
          <h3>Contact Information</h3>
          <p>Email: example@example.com</p>
          <p>Phone: 123-456-7890</p>
          <p>Address: 123 Main St, City, Country</p>
        </div>

        <div className="contact-page-form">
          <h3>Contact Form</h3>
          <p>Please fill out the form below to submit your inquiry or feedback.</p>
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" required></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
