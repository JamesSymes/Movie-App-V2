import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartProvider';
import '../styles/MovieCard.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faInfoCircle, faCheck } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({ movie, isFeatured }) => {
  const { id, title, poster_path, release_date } = movie;
  const { addToCart, cartItems } = useContext(CartContext);  

  // Function to check if the movie is already in the cart
  const isMovieInCart = () => {
    return cartItems.some(item => item.id === id);
  };

  const [itemAdded, setItemAdded] = useState(isMovieInCart());

  const handleAddToCart = () => {
    const releaseYear = new Date(release_date).getFullYear();
    const price = calculatePrice(releaseYear);
    addToCart({ ...movie, poster_path, price });

    setItemAdded(true);  // Update the state when movie is added
  };

  const calculatePrice = (releaseYear) => {
    const currentYear = new Date().getFullYear();
    const yearsAgo = currentYear - releaseYear;

    if (yearsAgo <= 1) {
      return 19.99;
    } else if (yearsAgo <= 3) {
      return 14.99;
    } else if (yearsAgo <= 6) {
      return 9.99;
    } else {
      return 6.99;
    }
  };

  const renderRegularCard = () => (
    <div className="movie-card-container">
      <div className="movie-card">
        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
      </div>
      <div className="button-container">
        <button className="round-button cart-button" onClick={handleAddToCart}>
          <FontAwesomeIcon icon={itemAdded ? faCheck : faShoppingCart} />
        </button>
        <Link to={`/movies/${id}`} className="round-button info-button">
          <FontAwesomeIcon icon={faInfoCircle} />
        </Link>
      </div>
    </div>
  );

  const renderFeaturedCard = () => (
    <div className="featured-movie-card-wrapper">
      <div className="featured-movie-card">
        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
      </div>
      <div className="button-container">
        <button className="round-button cart-button" onClick={handleAddToCart}>
          <FontAwesomeIcon icon={itemAdded ? faCheck : faShoppingCart} />
        </button>
        <Link to={`/movies/${id}`} className="round-button info-button">
          <FontAwesomeIcon icon={faInfoCircle} />
        </Link>
      </div>
      {/* ... potentially other JSX specific to featured movie ... */}
    </div>
  );

  return isFeatured ? renderFeaturedCard() : renderRegularCard();
};

export default MovieCard;
