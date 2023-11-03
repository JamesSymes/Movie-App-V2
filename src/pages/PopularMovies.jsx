import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
// import '../styles/HomePage.css';

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=1`)
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="popular-movies-content">
      <div className="page-content">
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default PopularMovies;
