// GenrePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import '../styles/GenrePage.css';

const GenrePage = () => {
  const [movies, setMovies] = useState([]);
  const { genre } = useParams(); // Update the parameter name

  useEffect(() => {
    // Fetch movies for the selected genre
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&with_genres=${genre}`) // Use genre
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .catch(error => console.error(error));
  }, [genre]); // Update the dependency

  return (
    <div className="genre-page-content">
      <div className="genre-page">
        <div className="movie-list">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default GenrePage;


