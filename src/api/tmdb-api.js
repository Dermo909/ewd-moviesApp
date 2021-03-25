import { MovieCreation } from "@material-ui/icons";

export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-GB&include_adult=false&page=1`
  )
    .then(res => res.json())
    .then(json => json.results);
};

export const getMovie = id => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then(res => res.json())
   .then(data => {
     console.log(data);
     // Add release year member
     data.releaseYear = data.release_date.substring(0, 4);
     // Format runtime
     const hours = Math.floor(data.runtime / 60);
     const minutes = data.runtime % 60;
     data.runtime = hours + 'h' + minutes + 'm';
     return data;
   })
};

export const getMovieImages = id => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then(res => res.json())
    .then(json => {
      return json.posters
    });
};

export const getGenres = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
    process.env.REACT_APP_TMDB_KEY +
    "&language=en-GB"
  )
    .then(res => res.json())
    .then(json => json.genres);
};

export const getMovieReviews = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      return json.results;
    });
};

export const getUpcomingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-UGB&include_adult=false&page=1`
  )
    .then(res => res.json())
    .then(json => json.results);
};

export const getFilmCertification = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${process.env.REACT_APP_TMDB_KEY}`
  )
    .then((response) => { 
      return response.json() 
    })
    .then((response) => {
      if (response.results !== undefined) {
        if (response.results.length > 0) {
          // Get the first certification in the response
          let i = 0;
          while(i != response.results.length) {
            if (response.results[i].release_dates[0].certification.length > 0) {
              return response.results[i].release_dates[0].certification;
            }
            i++;
          }
          return 'Not Rated';
        } else {
          return 'Not Rated';
        }
      } else {
        return 'Not Rated';
      }
    });
};

export const getTop100Movies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-GB&page=1`
)
  .then(res => res.json())
  .then(json => {
    return json.results;
  });
};


