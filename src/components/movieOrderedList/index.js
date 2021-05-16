import React from "react";
import { Link } from "react-router-dom";

const MovieOrderedList = ({ movies }) => {
  console.log('top movies:', movies);
  let moviesList = movies.map((m) => (
    <li key={m.title}><Link to={`/movies/${m.id}`}  style={{ textDecoration: 'none' }}>{m.title} - {m.vote_average}</Link> </li>
  ));
  return moviesList;
};

export default MovieOrderedList;