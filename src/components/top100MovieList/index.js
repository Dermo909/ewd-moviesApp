import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MovieList from "../movieOrderedList";

function Top100MoviesPageTemplate({ movies, title }) {
  return (
    <div>
        <Header title={title} />
        <MovieList movies={movies}></MovieList>
    </div>
  );
}
export default Top100MoviesPageTemplate;
