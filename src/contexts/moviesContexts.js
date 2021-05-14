import React, { useReducer, useEffect, useState, useContext } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import { getMovies, addMovieToFavourites, addMovieToWatchlist, getUserFavourites } from "../api/movie-api";
import { convertReleaseDateToString, convertToPercentage } from '../utils';
import { AuthContext } from './authContext';

const reducer = (state, action) => {
  switch (action.type) {
    case "load-favourite-movies":
      return {
        favouriteMovies: action.payload.favouritesResult,
        upcoming: [...state.upcoming],
        movies: [...state.movies],
      };
    case "remove-favorite":
      return {
        movies: state.movies.map((m) =>
          m.id === action.payload.movie.id ? { ...m, favorite: false } : m
        ),
        upcoming: [...state.upcoming],
        favouriteMovies: [...state.favouriteMovies],
      };
    case "remove-from-playlist":
      return {
        upcoming: state.upcoming.map((m) =>
          m.id === action.payload.movie.id ? { ...m, playlist: false } : m
        ),
      };
    case "load-discover-movies":
      console.log('case load-discover-movies ', action.payload);
      return {
        movies: action.payload.movies,
        upcoming: [...state.upcoming],
        favouriteMovies: [...state.favouriteMovies],
      };
    case "load-upcoming-movies":
      return {
        upcoming: action.payload.movies,
        movies: [...state.movies],
        favouriteMovies: [...state.favouriteMovies],
      };
    case "add-review":
      return {
        movies: state.movies.map((m) =>
          m.id === action.payload.movie.id
            ? { ...m, review: action.payload.review }
            : m
        ),
        upcoming: [...state.upcoming],
        favouriteMovies: [...state.favouriteMovies],
      };
    default:
      return state;
  }
};

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, { movies: [], upcoming: [], favouriteMovies: [] });
  const [authenticated, setAuthenticated] = useState(false);

  const auth = useContext(AuthContext);
  console.log('auth: ', auth);
  
  const addToFavorites = (movieId) => {
    console.log('Add to favorite: ', movieId);

    async function addToFavourites() {
      const result = await addMovieToFavourites(auth.userName, movieId);
      console.log('addToFavourites result: ', result);
    }
    addToFavourites();
  };

  useEffect(() => {
    async function getFavourites() {
      const favouritesResult = await getUserFavourites(auth.userName);
      console.log('useEffect getUserFavourites result: ', favouritesResult);

      dispatch({ type: "load-favourite-movies", payload: { favouritesResult } });
    }
    getFavourites();
  }, []);

  const getFavourites = async () => {
      getUserFavourites(auth.userName).then(favouriteMovies => { 
        dispatch({ type: "load-favourite-movies", payload: { favouriteMovies } });
      });
  };

  const addToPlaylist = (movieId) => {
    console.log('Add to watchlist: ', movieId);

    async function addToWatchlist() {
      const result = await addMovieToWatchlist(auth.userName, movieId);
      console.log('addToFavourites result: ', result);
    }
    addToWatchlist();
  };

  const removeFromPlaylist = (movieId) => {
    const index = state.upcoming.map((m) => m.id).indexOf(movieId);
    console.log('removeFromPlaylist() index', index);
    dispatch({
      type: "remove-from-playlist",
      payload: { movie: state.upcoming[index] },
    });
  };

  const removeFromFavorites = (movieId) => {
    const index = state.movies.map((m) => m.id).indexOf(movieId);
    dispatch({
      type: "remove-favorite",
      payload: { movie: state.movies[index] },
    });
  };

  const addReview = (movie, review) => {
    dispatch({ type: "add-review", payload: { movie, review } });
  };

  useEffect(() => {
    async function fetchMovies() {
      const moviesResult = await getMovies();
      console.log('useEffect getMovies result: ', moviesResult);

      moviesResult.results.forEach(x => {
        x.vote_average = convertToPercentage(x.vote_average);
        x.release_date = convertReleaseDateToString(x.release_date);
      });

      const movies = moviesResult.results;
      dispatch({ type: "load-discover-movies", payload: { movies } });
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    getUpcomingMovies().then((movies) => {
      console.log('useEffect getUpcomingMovies result: ', movies);
      dispatch({ type: "load-upcoming-movies", payload: { movies } });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        movies: state.movies,
        upcoming: state.upcoming,
        favouriteMovies: state.favouriteMovies,
        addToFavorites: addToFavorites,
        removeFromFavorites: removeFromFavorites,
        addReview: addReview,
        addToPlaylist: addToPlaylist,
        removeFromPlaylist: removeFromPlaylist,
        getFavourites: getFavourites,
        setAuthenticated
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;