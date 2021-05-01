import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import useForm from "react-hook-form";
import { MoviesContext } from "../../contexts/moviesContexts";
import { withRouter } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar"; 
import MuiAlert from "@material-ui/lab/Alert";
import Alert from '@material-ui/lab/Alert';
import { convertUserRatingToPercentage } from '../../utils';

const ratings = [
  {
    value: 5,
    label: "Excellent",
  },
  {
    value: 4,
    label: "Good",
  },
  {
    value: 3,
    label: "Average",
  },
  {
    value: 2,
    label: "Poor",
  },
  {
    value: 0,
    label: "Terrible",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    "& > * ": {
      marginTop: theme.spacing(2),
    },
  },
  textField: {
    width: "40ch",
  },
  submit: {
    marginRight: theme.spacing(2),
  },
  snack: {
     width: "50%",
     "& > * ": {
       width: "100%",
     },
   },
}));

const ReviewForm = ({ movie, history }) => {
  const classes = useStyles();
  const { register, handleSubmit, errors, reset } = useForm();
  const context = useContext(MoviesContext);
  const [rating, setRating] = useState(3);
  const [open, setOpen] = React.useState(false);

  const isLoggedIn = localStorage.getItem('LoggedIn');

  const renderPage = () => {
    if (isLoggedIn === 'true') {
      return (
        <Box component="div" className={classes.root}>
          <Typography component="h2" variant="h3">
            Write a review
          </Typography>
    
          <Snackbar open={open} autoHideDuration={3000} onClose={handleSnackClose}>
            <Alert onClose={handleSnackClose} severity="success">
            Thank you for submitting a review!
            </Alert>
          </Snackbar>
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <TextField
              className={classes.textField}
              variant="outlined"
              margin="normal"
              required
              id="author"
              label="Author's name"
              name="author"
              autoFocus
              inputRef={register({ required: "Author name required" })}
            />
            {errors.author && (
              <Typography variant="h6" component="p">
                {errors.author.message}
              </Typography>
            )}
    
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="content"
              label="Review text"
              id="content"
              multiline
              rows={10}
              inputRef={register({
                required: "No review text",
                minLength: { value: 10, message: "Review is too short" },
              })}
            />
            {errors.content && (
              <Typography variant="h6" component="p">
                {errors.content.message}
              </Typography>
            )}
            <TextField
              id="select-rating"
              select
              variant="outlined"
              label="Rating Select"
              value={rating}
              onChange={handleRatingChange}
              helperText="Don't forget your rating"
            >
              {ratings.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
    
            <Box className={classes.buttons}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
              <Button
                type="reset"
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={() => {
                  reset({
                    author: "",
                    content: "",
                  });
                }}
              >
                Reset
              </Button>
            </Box>
          </form>
        </Box>
      );
    } else {
      return <h1>You need to be logged in to access this page</h1>;
    }
  }
  const handleSnackClose = (event) => {
    setOpen(false);
    history.push("/");
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const onSubmit = (review) => {
    review.movieId = movie.id;
    review.rating = rating;

    // Saving to local storage to display users rating on movie also
    localStorage.setItem(`UserRating${movie.id}`, convertUserRatingToPercentage(rating));

    context.addReview(movie, review);
    setOpen(true);   // NEW
  };
  return (
    <div>
      {renderPage()}
    </div>
  );
};

export default withRouter(ReviewForm);