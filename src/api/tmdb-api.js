import { convertToPercentage } from '../utils';

export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-GB&include_adult=false&page=1`
    // API lab 1
    //`https://virtserver.swaggerhub.com/Dermo909/MovieAPI/1.0/api/movies`
    // API lab 2
    //`/api/movies`
  )
    .then(res => res.json())
    .then(json => { 
      json.results.forEach(x => {
        x.vote_average = convertToPercentage(x.vote_average);
      });
      return json.results; });
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
     // format user score
     data.vote_average = convertToPercentage(data.vote_average);// data.vote_average * 10 + '%';
     // Get production country
     data.productionCountry = data.production_countries[0].name;
     return data;
   })
};

export const getMovieImages = id => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en`
  ).then(res => res.json())
    .then(json => {
      return json.posters;
    });
};

export const getMovieBackdrop = id => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then(res => res.json())
    .then(json => {
      return json.backdrops[0];
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
      console.log('Reviews: ', json.results);
      return json.results;
    });
};

export const getTopMovieReview = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {

      if (json.results.length > 0) {
        const review = json.results[0];
        console.log('reviews: ', json.results);
        console.log('review:', review);
        // Some avatars are stored on tmdb but others are stored elsewhere
        // If avatar path has 'http' in it then its elsewhere so we use as is
        // If not include 'http' then its a filename on tmdb
        if (review.author_details.avatar_path.includes('http') === false) {
          review.author_details.avatar_path = `https://image.tmdb.org/t/p/w92${review.author_details.avatar_path}`;
        } else {
          // External avatars have '/' at the start
          review.author_details.avatar_path = review.author_details.avatar_path.substring(1);
        }
        review.created_at = new Date(review.created_at).toDateString();
        review.rating = review.author_details.rating;
        return review;
      } else {
        const review = {
          author_details: {
            avatar_path: '',
            rating: 0
          }};
          return review;
      }
      
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
          while(i !== response.results.length) {
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
    console.log('top 100:', json.results);
    json.results.forEach(x => {
      x.vote_average = convertToPercentage(x.vote_average);// * 10 + '%';
    });
    return json.results;
  });
};

export const getCastAndCrew = id => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then(res => res.json())
    .then(data => {
      console.log('Cast and crew: ', data);
      const filteredData = [];
      // Get some details
      // There might be more than one of each but we're only interested in one
      filteredData.director = data.crew.filter(x => x.known_for_department === 'Directing')[0];
      filteredData.writer = data.crew.filter(x => x.known_for_department === 'Writing')[0];
      filteredData.producer = data.crew.filter(x => x.known_for_department === 'Production')[0];

      if (filteredData.director === undefined) {
        filteredData.director = "<none specified>";
      }
      if (filteredData.writer === undefined) {
        filteredData.writer = "<none specified>";
      }
      if (filteredData.producer === undefined) {
        filteredData.producer = "<none specified>";
      }
      // Order the actors by popularity 
      // Front end will decide how many to show
      filteredData.sortedActors = Object.keys(data.cast).sort(function(a,b){
                          return data.cast[a.popularity]-data.cast[b.popularity]
                          }).map(key => data.cast[key]);
                          console.log(filteredData.sortedActors);
      return filteredData;
    })
};


