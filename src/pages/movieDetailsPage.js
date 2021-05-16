import React, { useContext }from "react";
import { withRouter } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import useMovie from "../hooks/useMovie";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { AuthContext } from "../contexts/authContext";
import { Redirect } from "react-router-dom";

const MovieDetailsPage = ({
  match: {
    params: { id },
  },
}) => {
  console.log('movieDetailsPage, id: ', id);
  const [movie] = useMovie(id);
  const auth = useContext(AuthContext);
  if (auth.isAuthenticated === false) {
    return <Redirect to={'/unathorised'} />;
  }
  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
          </PageTemplate>
        </>
      ) : (
        <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)'
      }}
      />
      )}
    </>
  );
};

export default withRouter(MovieDetailsPage);