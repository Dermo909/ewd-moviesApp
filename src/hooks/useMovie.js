import { useEffect, useState } from "react";
import { getFilmCertification, getMovie, getCastAndCrew, getTopMovieReview } from '../api/tmdb-api'

const useMovie = id => {
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    getMovie(id).then(movie => {

      getFilmCertification(id).then(cert => {
        movie.certification = cert;

        getCastAndCrew(id).then(castAndCrew => {
          movie.castAndCrew = castAndCrew;

          getTopMovieReview(id).then(review => {
            movie.topReview = review;

            console.log(movie);
            setMovie(movie);
          });

        })

      })

    });
  }, [id]);
  return [movie, setMovie];
};

export default useMovie