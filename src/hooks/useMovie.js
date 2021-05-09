import { useEffect, useState } from "react";
import { getFilmCertification,  getCastAndCrew, getTopMovieReview } from '../api/tmdb-api'
import { getMovie } from '../api/movie-api.js';

const useMovie = id => {
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    console.log('useEffect');
    getMovie(id).then(movie => {

      getFilmCertification(id).then(cert => {
        movie.certification = cert;

        getCastAndCrew(id).then(castAndCrew => {
          movie.castAndCrew = castAndCrew;

          getTopMovieReview(id).then(review => {
            movie.topReview = review;

            movie.userRating = localStorage.getItem(`UserRating${movie.id}`);
            setMovie(movie);
          });

        })

      })

    });
  }, [id]);
  return [movie, setMovie];
};

export default useMovie