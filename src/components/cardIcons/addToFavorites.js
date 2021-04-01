import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContexts";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  console.log('add to fave: ', movie);
  const handleAddToFavorites = (e) => {
    e.preventDefault();
    context.addToFavorites(movie.id);
  };
  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;