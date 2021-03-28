import { useEffect, useState } from "react";
import { getFilmCertification, getMovie, getCastAndCrew } from '../api/tmdb-api'

const useMovie = id => {
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    getMovie(id).then(movie => {

      getFilmCertification(id).then(cert => {
        movie.certification = cert;

        getCastAndCrew(id).then(castAndCrew => {
          movie.castAndCrew = castAndCrew;

          console.log(movie);
          setMovie(movie);
        })

      })

    });
  }, [id]);
  return [movie, setMovie];
};

export default useMovie