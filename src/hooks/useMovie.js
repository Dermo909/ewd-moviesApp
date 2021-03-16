import { useEffect, useState } from "react";
import {getGBFilmCertification, getMovie} from '../api/tmdb-api'

const useMovie = id => {
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    getMovie(id).then(movie => {
      getGBFilmCertification(id).then(cert => {
        movie.certification = cert;
        setMovie(movie);
      })
      
    });
  }, [id]);
  return [movie, setMovie];
};

export default useMovie