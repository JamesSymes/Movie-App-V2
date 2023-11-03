// MoviePage.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../components/CartProvider';
import '../styles/MoviePage.css';

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [price, setPrice] = useState(null);
  const { addToCart } = useContext(CartContext);

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

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`
        );
        const data = await response.json();
        setMovie(data);

        const releaseYear = new Date(data.release_date).getFullYear();
        setPrice(calculatePrice(releaseYear));
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ 
      id: movie.id,
      title: movie.title,
      price: price,
      quantity: 1,
      poster_path: movie.poster_path, 
    });
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  const genres = movie.genres.map((genre) => genre.name).join(', ');

  return (
    <div className="page-content">
      <div className="movie-page-container">
        <div className="poster-container">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="info-container">
          <h2>{movie.title}</h2>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Genres:</strong> {genres}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.runtime} minutes
          </p>
          <p>
            <strong>Vote Average:</strong> {movie.vote_average} (based on{' '}
            {movie.vote_count} votes)
          </p>
          <p>
            <strong>Overview:</strong> {movie.overview}
          </p>
          {price && (
            <div className="movie-page-price-container">
              <p className="movie-page-price">${price.toFixed(2)}</p>
              <button className="cart-button" onClick={handleAddToCart}> {/* Add onClick event handler */}
                🛒 <span className="add-to-cart-text">Add to Cart</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;


