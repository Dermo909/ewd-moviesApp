import React from "react";
import Movie from "../movieCard";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
const MovieOrderedList = ({ movies }) => {
  let moviesList = movies.map((m) => (
    <li key={m.title}>
      <Link to={`/movies/${m.id}`}>
      {m.title} - {m.vote_average}</Link>
      </li>
  ));
  return moviesList;
};

export default MovieOrderedList;