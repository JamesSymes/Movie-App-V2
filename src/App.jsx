// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import GenrePage from './pages/GenrePage';
import Header from './components/Header';
import Footer from './components/Footer';
import CartProvider from './components/CartProvider';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Payment from './components/Payment';
import Review from './components/Review';
import Confirmation from './components/Confirmation';
import ShoppingCartPage from './pages/ShoppingCartPage';
import PopularMovies from './pages/PopularMovies';
import AboutPage from './pages/AboutPage'; // Import the AboutPage component
import ContactPage from './pages/ContactPage'; 

const App = () => {
  return (
    <Router>
      <CartProvider>
        <Header />
        <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/genres/:genre" element={<GenrePage />} />
            <Route path="/popular-movies" element={<PopularMovies />} />
            <Route path="/about" element={<AboutPage />} /> {/* Add the route for the About page */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/review" element={<Review />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/shopping-cart" element={<ShoppingCartPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Add other routes as needed */}
          </Routes>
        </div>
        <Footer />
      </CartProvider>
    </Router>
  );
};

export default App;
