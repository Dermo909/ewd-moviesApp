import React, { useContext } from "react";
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import useMovie from "../hooks/useMovie";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { AuthContext } from "../contexts/authContext";
import { Redirect } from "react-router-dom";

const WriteReviewPage = ({
  location: {
    state: { movieId },
  },
}) => {
  const [movie] = useMovie(movieId);

  const auth = useContext(AuthContext);
  if (auth.isAuthenticated === false) {
    return <Redirect to={'/unathorised'} />;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
              <ReviewForm movie={movie} />
          </PageTemplate>
        </>
      ) : (
        <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} 
      />
      )}
    </>
  );
};

export default WriteReviewPage;