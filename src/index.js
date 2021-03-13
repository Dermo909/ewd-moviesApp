import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import UpcomingMoviesPage from './pages/upcomingMoviesPage';

const App = () => {
  return (
    <BrowserRouter>
      <SiteHeader />      {/* New Header  */}
      <Switch>
        <Route exact path="/movies/favorites" component={FavoriteMoviesPage} />
        <Route exact path="/movies/upcoming" component={UpcomingMoviesPage} />
        <Route path="/movies/:id" component={MoviePage} />
        <Route exact path="/" component={HomePage} />
        <Route path="/reviews/:id" component={MovieReviewPage} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));