import { DataUsageRounded } from "@material-ui/icons";

export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=1`
  )
    .then(res => res.json())
    .then(json => json.results);
};

export const getMovie = id => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then(res => res.json())
   .then(data => {
    //  data.certification = getGBFilmCertification(id);
    //  console.log(data);
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
    "&language=en-US"
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
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=1`
  )
    .then(res => res.json())
    .then(json => json.results);
};

export const getGBFilmCertification = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${process.env.REACT_APP_TMDB_KEY}`
  )
    .then((response) => { 
      return response.json() 
    })
    .then((response) => {
      const filteredCerts = response.results.filter(x => x.iso_3166_1 === 'GB');

      if (filteredCerts.length > 0) {
        if (filteredCerts[0].release_dates.length > 0) {
          return filteredCerts[0].release_dates[0].certification;
        } else {
          return '';
        }
      } else {
        return '';
      }
    });
};