import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";
import { AuthContext } from "../contexts/authContext";
import { Redirect } from "react-router-dom";

const MovieReviewPage = ({
  location: {
    state: { movie, review },
  },
}) => {
  // const auth = useContext(AuthContext);
  // if (auth.isAuthenticated === false) {
  //   return <Redirect to={'/unathorised'} />;
  // }
  return (
    <PageTemplate movie={movie}>
      <MovieReview review={review} />
    </PageTemplate>
  );
};

export default withRouter(MovieReviewPage);