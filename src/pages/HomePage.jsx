// HomePage.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';




const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [dramaMovies, setDramaMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [hoveredSection, setHoveredSection] = useState(null);
  const popularMoviesRef = useRef(null);
const comedyMoviesRef = useRef(null);
const dramaMoviesRef = useRef(null);
const horrorMoviesRef = useRef(null);
const [featuredMovie, setFeaturedMovie] = useState(null);


// hidding the left < botton until the > button has been clicked once 
const [popularRightClicked, setPopularRightClicked] = useState(false);
const [dramaRightClicked, setDramaRightClicked] = useState(false);
const [horrorRightClicked, setHorrorRightClicked] = useState(false);


const [endClickCount, setEndClickCount] = useState(0);

const MOVIE_CARD_WIDTH = window.innerWidth * 0.875;  // scroll by 7 movies to correct starting point. Math is 0.125 each movie x 7 = 0.875


// scroll to the right on a loop
const scrollMovieList = (movieListRef, movies) => {
  if (movieListRef.current) {
    
    const widthOfOneMovie = MOVIE_CARD_WIDTH;

    const newScrollPosition = movieListRef.current.scrollLeft + widthOfOneMovie;
    const maxScroll = movieListRef.current.scrollWidth - window.innerWidth;

    const canScrollFurther = movieListRef.current.scrollLeft + 2 * widthOfOneMovie <= maxScroll;

    if (!canScrollFurther) {
      // Append the first set of movies to the end to simulate looping
      const nodesToAppend = Array.from(movieListRef.current.children).slice(0, movies.length);
      nodesToAppend.forEach(node => {
        const clonedNode = node.cloneNode(true);
        movieListRef.current.appendChild(clonedNode);
      });
    }

    window.requestAnimationFrame(() => {
      // Adjust the scrollLeft position
      movieListRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    });
  }
};

// scroll to the left on a loop
const scrollMovieListLeft = (movieListRef, movies) => {
  if (movieListRef.current) {
    const widthOfOneMovie = MOVIE_CARD_WIDTH;

    const newScrollPosition = movieListRef.current.scrollLeft - widthOfOneMovie;

    const canScrollBackwards = movieListRef.current.scrollLeft - widthOfOneMovie >= 0;

    if (!canScrollBackwards) {
      // Adjust the scroll position to make space for the prepended movies
      movieListRef.current.scrollLeft += movies.length * widthOfOneMovie;

      // Prepend the last set of movies to simulate looping
      const nodesToPrepend = Array.from(movieListRef.current.children).slice(-movies.length);
      nodesToPrepend.reverse().forEach(node => {
        const clonedNode = node.cloneNode(true);
        movieListRef.current.prepend(clonedNode);
      });
    }

    window.requestAnimationFrame(() => {
      // Smoothly adjust the scrollLeft position
      movieListRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    });
  }
};






  useEffect(() => {
// Fetch popular movies
fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=1`)
.then(response => response.json())
.then(data => {
  // Set popular movies
  const popularMoviesList = data.results.slice(0, 24);
  setPopularMovies(popularMoviesList);

  // Find the first movie with a rating of 8 or higher and set it as the featured movie
  const highRatedMovie = popularMoviesList.find(movie => movie.vote_average >= 8);
  if (highRatedMovie) {
    setFeaturedMovie(highRatedMovie);
  }
})
.catch(error => console.error(error));
    
    // Fetch popular movies
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=1`)
      .then(response => response.json())
      .then(data => setPopularMovies(data.results.slice(0, 24)))
      .catch(error => console.error(error));

    // Fetch comedy movies
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&with_genres=35`)
      .then(response => response.json())
      .then(data => setComedyMovies(data.results.slice(0, 24)))
      .catch(error => console.error(error));

    // Fetch drama movies
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&with_genres=18`)
      .then(response => response.json())
      .then(data => setDramaMovies(data.results.slice(0, 24)))
      .catch(error => console.error(error));

    // Fetch horror movies
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&with_genres=27`)
      .then(response => response.json())
      .then(data => setHorrorMovies(data.results.slice(0, 24)))
      .catch(error => console.error(error));
  }, []);

  const handleMouseEnter = sectionName => {
    setHoveredSection(sectionName);
  };

  const handleMouseLeave = () => {
    setHoveredSection(null);
  };

  const getGenreLink = genreId => `/genres/${genreId}`;

  return (
    <div className="page-content">
    {featuredMovie && (
      <div className="featured-movie">
        
        <MovieCard movie={featuredMovie} isFeatured={true} />

      </div>
    )}
      <div className="section" onMouseEnter={() => handleMouseEnter('popular')} onMouseLeave={handleMouseLeave}>
      
      <h2 className="section-title">
   <Link to="/popular-movies" className='.section-title'>Popular Movies</Link>
</h2>
        <div className="movie-list" ref={popularMoviesRef}>
          {popularMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        {
  hoveredSection === 'popular' && (
    <>
      {/* LEFT ARROW */}
      {popularRightClicked && (  // conditionally render the left arrow based on popularRightClicked state
        <div className="section-link-container-left">
          <Link 
            to="/popular-movies" 
            className="section-link" 
            onClick={(e) => {
              e.preventDefault();
              scrollMovieListLeft(popularMoviesRef, popularMovies);
            }}>
            &lt;
          </Link>
          <div className="section-link-shadow-left"></div>
        </div>
      )}
      
      {/* RIGHT ARROW */}
      <div className="section-link-container">
        <Link 
          to="/popular-movies" 
          className="section-link" 
          onClick={(e) => {
            e.preventDefault();
            scrollMovieList(popularMoviesRef, popularMovies);
            setPopularRightClicked(true);  // update the state here
          }}>
          &gt;
        </Link>
        <div className="section-link-shadow"></div>
      </div>
    </>
  )
}

      </div>

      <div className="section" onMouseEnter={() => handleMouseEnter('drama')} onMouseLeave={handleMouseLeave}>
      <h2 className="section-title">
   <Link to={getGenreLink(18)}>Drama Movies</Link>
</h2>
  <div className="movie-list" ref={dramaMoviesRef}>
    {dramaMovies.map(movie => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
  {
  hoveredSection === 'drama' && (
    <>
      {/* LEFT ARROW */}
      {dramaRightClicked && (  // conditionally render the left arrow based on dramaRightClicked state
        <div className="section-link-container-left">
          <Link 
            to="/drama-movies" 
            className="section-link" 
            onClick={(e) => {
              e.preventDefault();
              scrollMovieListLeft(dramaMoviesRef, dramaMovies);
            }}>
            &lt;
          </Link>
          <div className="section-link-shadow-left"></div>
        </div>
      )}
      
      {/* RIGHT ARROW */}
      <div className="section-link-container">
        <Link 
          to="/drama-movies" 
          className="section-link" 
          onClick={(e) => {
            e.preventDefault();
            scrollMovieList(dramaMoviesRef, dramaMovies);
            setDramaRightClicked(true);  // update the state here
          }}>
          &gt;
        </Link>
        <div className="section-link-shadow"></div>
      </div>
    </>
  )
}

</div>


<div className="section" onMouseEnter={() => handleMouseEnter('horror')} onMouseLeave={handleMouseLeave}>
<h2 className="section-title">
   <Link to={getGenreLink(27)}>Horror Films</Link>
</h2>
  <div className="movie-list" ref={horrorMoviesRef}>
    {horrorMovies.map(movie => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
  {
  hoveredSection === 'horror' && (
    <>
      {/* LEFT ARROW */}
      {horrorRightClicked && (  // conditionally render the left arrow based on horrorRightClicked state
        <div className="section-link-container-left">
          <Link 
            to="/horror-movies" 
            className="section-link" 
            onClick={(e) => {
              e.preventDefault();
              scrollMovieListLeft(horrorMoviesRef, horrorMovies);
            }}>
            &lt;
          </Link>
          <div className="section-link-shadow-left"></div>
        </div>
      )}
      
      {/* RIGHT ARROW */}
      <div className="section-link-container">
        <Link 
          to="/horror-movies" 
          className="section-link" 
          onClick={(e) => {
            e.preventDefault();
            scrollMovieList(horrorMoviesRef, horrorMovies);
            setHorrorRightClicked(true);  // update the state here
          }}>
          &gt;
        </Link>
        <div className="section-link-shadow"></div>
      </div>
    </>
  )
}

</div>


    </div>
  );
};

export default HomePage;

