// AboutPage.jsx
import React from 'react';
import '../styles/AboutPage.css'; // Import the CSS file for styling

const AboutPage = () => {
  return (
    <div className="about-page-content">
      <div className="about-container">
        <h2>About</h2>
        <p>
          This is a movie application designed to showcase various features and functionality using the TMDB API. 
          It provides information about popular movies, genres, and allows users to browse and add movies to their cart.
        </p>
        <p>
          This product uses the TMDB API but is not endorsed or certified by TMDB. All movie data and images are provided 
          by TMDB. For legal usage, the TMDB logo is used to identify the use of the TMDB APIs.
        </p>
        <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="TMDB Logo" style={{ width: '50%' }} />
      </div>
    </div>
  );
};



export default AboutPage;
