import { useEffect, useState } from "react";
import {getFilmCertification, getMovie} from '../api/tmdb-api'

const useMovie = id => {
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    getMovie(id).then(movie => {
      getFilmCertification(id).then(cert => {
        movie.certification = cert;
        setMovie(movie);
      })
      
    });
  }, [id]);
  return [movie, setMovie];
};

export default useMovie