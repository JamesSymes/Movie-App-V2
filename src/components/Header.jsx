// Header.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartProvider';
import '../styles/Header.css';
import useWindowWidth from '../hooks/useWindowWidth';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCaretDown, faTimes } from '@fortawesome/free-solid-svg-icons';







const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const [popularMoviesId, setPopularMoviesId] = useState(null);
  const [animated, setAnimated] = useState(false);
  const [showGenres, setShowGenres] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);


  // mobile version hook
    const width = useWindowWidth();
    const isMobile = width <= 768;


    useEffect(() => {
      const handleScroll = () => {
        // When the scroll is more than 50px, set isScrolled to true, otherwise to false
        setIsScrolled(window.scrollY > 50);
      };
  
      // Add the event listener
      window.addEventListener('scroll', handleScroll);
  
      // Remove the event listener on cleanup
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=1`)
      .then(response => response.json())
      .then(data => setPopularMoviesId(data.id))
      .catch(error => console.error(error));

    if(cartItems.length > 0) {
      setAnimated(true);
      setTimeout(() => setAnimated(false), 500); // Reset after 0.5 seconds
    }
  }, [cartItems.length]);

 


  

    return (
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
          {isMobile ? (
              <>
                  <div className="header__top">
                      <Link to="/" className="header__logo">MOVIEAPP</Link>
                      <div className="header__cart">
                          <Link to="/cart" className="header-cart-button">
                              <span className={`header-cart-count ${animated ? 'animate' : ''}`}>{cartItems.length}</span>
                              <span role="img" aria-label="shopping-cart" className="header-cart-symbol"><FontAwesomeIcon icon={faShoppingCart} /></span>
                          </Link>
                      </div>
                  </div>
                  <nav className="header__nav">
                      <ul>
                      <li className="dropdown">
  <a href="#" onClick={() => setShowGenres(!showGenres)}>Genres <FontAwesomeIcon icon={faCaretDown} /></a>
  {showGenres && (
    <div className="fullscreen-dropdown"> {/* A full-screen wrapper for the dropdown */}
      <ul className="dropdown-content">
        {genres.map(genre => (
          <li key={genre.id}>
            <Link to={`/genres/${genre.id}`}>{genre.name}</Link>
          </li>
        ))}
      </ul>
      <div className="dropdown-close-button"> {/* A div for the close button to ensure it stays at the bottom */}
      <button onClick={() => setShowGenres(false)} className="close-button">
  <FontAwesomeIcon icon={faTimes} className="close-icon" />
</button>

      </div>
    </div>
  )}
</li>



                          <li><Link to="/about">About</Link></li>
                          <li><Link to="/contact">Contact</Link></li>
                      </ul>
                  </nav>
              </>
          ) : (
              <>
                  <div className="header__content">
                      <Link to="/" className="header__logo">MOVIEAPP</Link>
                      <nav>
                          <ul className="header__nav">
                              <li><Link to="/popular-movies">Popular Movies</Link></li>
                              <li className="dropdown">
                                  <a href="#">Genres</a>
                                  <ul className="dropdown-content">
                                      {genres.map(genre => (
                                          <li key={genre.id}>
                                              <Link to={`/genres/${genre.id}`}>{genre.name}</Link>
                                          </li>
                                      ))}
                                  </ul>
                              </li>
                              <li><Link to="/about">About</Link></li>
                              <li><Link to="/contact">Contact</Link></li>
                          </ul>
                      </nav>
                  </div>
                  <div className="header__cart">
                      <Link to="/cart" className="header-cart-button">
                          <span className={`header-cart-count ${animated ? 'animate' : ''}`}>{cartItems.length}</span>
                          <span role="img" aria-label="shopping-cart" className="header-cart-symbol"><FontAwesomeIcon icon={faShoppingCart} /></span>
                      </Link>
                  </div>
              </>
          )}
      </header>
  );
};

export default Header;