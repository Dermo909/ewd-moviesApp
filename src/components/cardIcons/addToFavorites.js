import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContexts";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const [open, setOpen] = React.useState(false);

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    context.addToFavorites(movie._id);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <Box>
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Movie added to favorites!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddToFavoritesIcon;