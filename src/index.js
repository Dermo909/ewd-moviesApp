import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import UpcomingMoviesPage from './pages/upcomingMoviesPage';
import MoviesContextProvider from "../src/contexts/moviesContexts";
import GenresContextProvider from "../src/contexts/genresContexts";
import AuthProvider from "../src/contexts/authContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import WatchlistMoviesPage from './pages/watchlistMoviesPage';
import Top100MoviesPage from './pages/top100MoviesPage';
import LoginPage from './pages/login';
import SignUpPage from './components/SignUp';
import unathorised from './pages/unathorised';

const App = () => {
  return (
    <BrowserRouter>
      <div className="jumbotron">
        <SiteHeader />
        <div className="container-fluid">
        <AuthProvider>
          <MoviesContextProvider>
            <GenresContextProvider>
              
              <Switch>
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/signup" component={SignUpPage} />
                <Route exact path="/" component={HomePage} />
                <Route exact path="/reviews/form" component={AddMovieReviewPage} />
                <Route exact path="/movies/favorites" component={FavoriteMoviesPage} />
                <Route exact path="/movies/upcoming" component={UpcomingMoviesPage} />
                <Route exact path="/movies/watchlist" component={WatchlistMoviesPage} />
                <Route exact path="/movies/top100" component={Top100MoviesPage} />
                <Route path="/movies/:id" component={MoviePage} />
                
                <Route path="/reviews/:id" component={MovieReviewPage} />
                <Redirect from="*" to="/" />
              </Switch>
              
            </GenresContextProvider>
          </MoviesContextProvider>
          </AuthProvider>
        </div>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));