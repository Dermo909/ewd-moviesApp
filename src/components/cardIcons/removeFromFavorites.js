import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { MoviesContext } from "../../contexts/moviesContexts";

const RemoveFromFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleRemoveFromFavorites = (e) => {
    e.preventDefault();
    context.removeFromFavorites(movie.id);
  };
  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromFavorites}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavoritesIcon;