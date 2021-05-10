import { useEffect, useState } from "react";
import { getTopMovieReview } from '../api/tmdb-api'
import { getMovie, getCastAndCrew } from '../api/movie-api.js';
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
        // Get some details
        // There might be more than one of each but we're only interested in one
        movie.castAndCrew.director = castAndCrew.crew.filter(x => x.known_for_department === 'Directing')[0];
        movie.castAndCrew.writer = castAndCrew.crew.filter(x => x.known_for_department === 'Writing')[0];
        movie.castAndCrew.producer = castAndCrew.crew.filter(x => x.known_for_department === 'Production')[0];
  
        if (movie.castAndCrew.director === undefined) {
          movie.castAndCrew.director = "<none specified>";
        }
        if (movie.castAndCrew.writer === undefined) {
          movie.castAndCrew.writer = "<none specified>";
        }
        if (movie.castAndCrew.producer === undefined) {
          movie.castAndCrew.producer = "<none specified>";
        }
        // Order the actors by popularity 
        // Front end will decide how many to show
        movie.castAndCrew.sortedActors = Object.keys(castAndCrew.cast).sort(function(a,b){
                            return castAndCrew.cast[a.popularity]-castAndCrew.cast[b.popularity]
                            }).map(key => castAndCrew.cast[key]);
        
        console.log('Cast and Crew from API: ', movie.castAndCrew);

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