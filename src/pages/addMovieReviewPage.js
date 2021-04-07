import React from "react";
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import useMovie from "../hooks/useMovie";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const WriteReviewPage = ({
  location: {
    state: { movieId },
  },
}) => {
  const [movie] = useMovie(movieId);

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