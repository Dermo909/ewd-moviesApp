import React, { useReducer, useEffect, useState } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import { getMovies } from "../api/movie-api";

const reducer = (state, action) => {
  switch (action.type) {
    case "add-favorite":
      return {
        movies: state.movies.map((m) =>
          m.id === action.payload.movie.id ? { ...m, favorite: true } : m
        ),
        upcoming: [...state.upcoming],
      };
    case "remove-favorite":
      return {
        movies: state.movies.map((m) =>
          m.id === action.payload.movie.id ? { ...m, favorite: false } : m
        ),
        upcoming: [...state.upcoming],
      };
    case "add-to-playlist":
      return {
        upcoming: state.upcoming.map((m) =>
          m.id === action.payload.movie.id ? { ...m, playlist: true } : m
        ),
      };
    case "remove-from-playlist":
      return {
        upcoming: state.upcoming.map((m) =>
          m.id === action.payload.movie.id ? { ...m, playlist: false } : m
        ),
      };
    case "load-discover-movies":
      return {
        movies: action.payload.movies,
        upcoming: [...state.upcoming],
      };
    case "load-upcoming-movies":
      return {
        upcoming: action.payload.movies,
        movies: [...state.movies],
      };
    case "add-review":
      return {
        movies: state.movies.map((m) =>
          m.id === action.payload.movie.id
            ? { ...m, review: action.payload.review }
            : m
        ),
        upcoming: [...state.upcoming],
      };
    default:
      return state;
  }
};

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, { movies: [], upcoming: [] });
  const [authenticated, setAuthenticated] = useState(false);

  const addToFavorites = (movieId) => {
    console.log('Add to favorite: ', movieId);
    const index = state.movies.map((m) => m.id).indexOf(movieId);
    dispatch({ type: "add-favorite", payload: { movie: state.movies[index] } });
  };

  const addToPlaylist = (movieId) => {
    const index = state.upcoming.map((m) => m.id).indexOf(movieId);
    console.log('Add to playlist:', movieId);
    dispatch({ type: "add-to-playlist", payload: { movie: state.upcoming[index] } });
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

  // useEffect(() => {
  //   getMovies().then((movies) => {
  //     dispatch({ type: "load-discover-movies", payload: { movies } });
  //   });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    async function fetchMovies() {
      const result = await getMovies();
      console.log('result: ', result);
      dispatch({ type: "load", payload: { result } });
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    getUpcomingMovies().then((movies) => {
      dispatch({ type: "load-upcoming-movies", payload: { movies } });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        movies: state.movies,
        upcoming: state.upcoming,
        addToFavorites: addToFavorites,
        removeFromFavorites: removeFromFavorites,
        addReview: addReview,
        addToPlaylist: addToPlaylist,
        removeFromPlaylist: removeFromPlaylist,
        setAuthenticated
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;