import React from "react";
import Movie from "../movieCard";
import Grid from "@material-ui/core/Grid";

const MovieOrderedList = ({ movies }) => {
  let moviesList = movies.map((m) => (
    <li key={m.original_title}>{m.original_title}</li>
  ));
  return moviesList;
};

export default MovieOrderedList;