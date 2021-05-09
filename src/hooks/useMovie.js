import { useEffect, useState } from "react";
import { getFilmCertification,  getCastAndCrew, getTopMovieReview } from '../api/tmdb-api'
import { getMovie } from '../api/movie-api.js';
import { formatMovieRuntime, convertToPercentage, convertReleaseDateToString } from '../utils';

const useMovie = id => {
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    console.log('useEffect');
    getMovie(id).then(movie => {

      // Add release year member
      movie.releaseYear = movie.release_date.substring(0, 4);

      // Format release date
      movie.release_date = convertReleaseDateToString(movie.release_date);

      // Format runtime
      movie.runtime = formatMovieRuntime(movie.runtime);

      // format user score
      movie.vote_average = convertToPercentage(movie.vote_average);
      
      // Get production country
      movie.productionCountry = movie.production_countries[0].name;

      console.log('movie in useMovie: ', movie);

      getCastAndCrew(movie.id).then(castAndCrew => {
        movie.castAndCrew = castAndCrew;

        getTopMovieReview(movie.id).then(review => {
          movie.topReview = review;

          movie.userRating = localStorage.getItem(`UserRating${movie.id}`);
          setMovie(movie);
        });

      })

    });
  }, [id]);
  return [movie, setMovie];
};

export default useMovie