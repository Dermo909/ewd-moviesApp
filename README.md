# ewd-moviesApp

# Assignment 1 - React app with data fetched from the movie database online
Name: Dermot Grace (20081469)

## Overview
This react app is an extension of the react app that was built in the labs.

This is a react app which uses data as fetched from the movie database API with all data returned rendered on screen to display movies. Logged in users also have the opportunity to add to their favourites and watchlist. Logged in users can also add reviews to movies.

All other lab work is contained in the other folders.

## Installation Requirements

The repo can be cloned from: https://github.com/Dermo909/ewd-moviesApp.git

This can be achieved using the github desktop application or via a terminal window(in the directory you want the repository created)

```bat
https://github.com/Dermo909/ewd-moviesApp.git
```

Open the each folder in visual studio code and execute the following command in the terminal: 
```bat
npm install
```
This install should install all dependencies as used in the app.

## API Configuration

A configuration file will need to be created in the root directory of the node_lab2 folder. This file should be called ``.env```with the following movie DB key in it(replace the X placeholder with a key gotten form the movie database after registering):

Users can register for the movie database online at this link: https://www.themoviedb.org/signup

```bat
REACT_APP_TMDB_KEY=XXXXXXXXX
```

## Startup
The API can be started using the command 
```bat
npm start
```

The app can be stopped by pressing CTRL-C on the terminal window. Select 'Y' then to confirm.

Please clear localStorage for the app before continuing(if you have already logged in before)

## API design
The following methods are used in the API:
1. getMovies()
  * Gets movie data from the movie database
2. getMovie(parameter = id)
  * Gets the details for a selected movie id
3. getMovieImages(parameter = id)
  * Gets the images for a particular movie
4. getMovieBackdrop(parameter = id)
  * Gets the main image used when dispalying the movie
5. getGenres()
  * Gets a list of genres from the movie database
6. getMovieReviews(parameter = id)
  * Gets the movie reviews for a particular movie
7. getTopMovieReview(parameter = id)
  * Gets a single movie review to display on screen
8. getUpcomingMovies()
  * Gets a list of upcoming movies
9. getFilmCertification(parameter = id)
  * Gets the certification of the movie as it is not included with movie details 
10. getTop100Movies()
  * Gets a list of the top rated movies on the movie database
11. getCastAndCrew(parameter = id)
  * Gets the cast and crew for a movie


## Security 
On initial startup there will not be any user logged in and this can be verified in localStorage. The favourites/watchlist and add review parts of the application will not be available.

If the user tries to navigate to favourites or watchlist, a message will be displayed on screen indicating that thu user must log in. Similarly if the user tries to add a movie to either favourites or watchlist in the movie details screen then a snackbar will inform them similarly. Also if the user tries to add a review while not logged in they will be shown an error message.

This is acheived with conditional rendering in the app. Like so:
```bat
  const isLoggedIn = localStorage.getItem('LoggedIn');

  const renderPage = () => {
    if (isLoggedIn === 'true') {
      return (
        <PageTemplate
        title="Watchlist"
        movies={watchlistMovies}
        action={(movie) => {
          return (
            <>
              <RemoveFromWatchlist movie={movie} />
            </>
          );
        }}
      />
      );
    } else {
      //return <h1>You need to be logged in to access this page</h1>;
      return (
        <div className={classes.root}>
        <Typography component="h2" variant="h3">
        You need to be logged in to view watchlist
      </Typography>
      <div><Link to={`/login`}>Log in</Link>
      </div></div>
      );
    }
  }
```

After logging in via the login link(any user name will do) all the routes and options above will be available. This is determined by a LoggedIn flag stored in localStorage. UserName is also stored in local storage to assist with adding a review.


## Examples of calls to tmdb 
Each call to the movie database requires an API key for the user which is gotten after registering.

getMovies():
```bat
export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-GB&include_adult=false&page=1`
  )
    .then(res => res.json())
    .then(json => { 
      json.results.forEach(x => {
        x.vote_average = convertToPercentage(x.vote_average);
      });

      return json.results; });
};
```

getMovie(id):
```bat
export const getMovie = id => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then(res => res.json())
   .then(data => {
     console.log(data);
     // Add release year member
     data.releaseYear = data.release_date.substring(0, 4);
     // Format runtime
     const hours = Math.floor(data.runtime / 60);
     const minutes = data.runtime % 60;
     data.runtime = hours + 'h' + minutes + 'm';
     // format user score
     data.vote_average = convertToPercentage(data.vote_average);// data.vote_average * 10 + '%';
     // Get production country
     data.productionCountry = data.production_countries[0].name;
     return data;
   })
};
```

Some information on screen needs to be formatted and that is performed using various methods like string manipulation, conversion to percentage etc. Some methods in a utils file aid this process also:
```bat
export function convertToPercentage(num) {
  return num * 10 + '%';
}

export function convertUserRatingToPercentage(num) {
  return num * 2 * 10 + '%';
}
```

## Extra independent learning
Besides some React tags like Box/Link etc there are two main additions which required some investigation to implement correctly. 

### Spinner 
A spinner will be shown on screen after selecting a movie to view. This is shown using the following code(Loader tag). The spinner is displayed while the movie is being fetched and is null. 
```bat
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
```

The spinner is imported like so:
```bat
import Loader from "react-loader-spinner";
```

### Gridlist
A gridlist was also implemented on the movie page which allows the user to scroll through actors photos. Each item in the gridlist is clickable to display a full size version of the actors photo. This feature required some experimentation to get the photos displaying correctly with the correct image size beign gotten from a seperate movie databae endpoint:
```bat
        <GridList className={classes.gridList} cols={9}>
        {movie.castAndCrew.sortedActors.map((actor) => (
          <GridListTile key={actor.original_name}>
            <a href={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}>
            <img src={`https://image.tmdb.org/t/p/w154/${actor.profile_path}`} alt={actor.profile_path} />
            </a>
            <GridListTileBar
              title={actor.original_name}
              classes={{
                root: classes.titleBar,
              }}
            />
          </GridListTile>
        ))}
      </GridList>
```

### Login/protecting routes
As there was no database in this part of the assignment a workaround needed to be achieved to mimic a user needing to log in before seeing certain pages or being allowed to add a review.

Getting a user to log in using a text entry field and then storing the user name with a logged in flag was deemed a suitable method of mimicing the login process. Only some routes were protected so conditional rendering was used to either display the page or an error message. This is detailed under the security heading above.


## Features
The following list is a working list/TODO as I worked through the assignment

1. Movie
  * Country of origin
  * Remove more info link
  * Add to favourites and watchlist from movie page
  * Add review from movie
  * Snackbar when added to favorites on movie page
  * Clickable pictures for cast	
  * Make movie image clickable on discover and upcoming
  * Add certificate info to movies
  * Display only 1 image on left
  * Movie length
  * Year of release beside movie title
  * List of crew
  * Main actors under movie description 
  * Date of release

2. Reviews:
  * Restrict logged in users to add reviews
  * Auto complete logged in users name if logged in
  * Add review to bottom of movie details page with reviewer details
  * Limit review to however many characters
  * Full review link
  * Add review button to movie details page
  * Show user rating on page in a green chip if entered
  * show users review in the full review drawer
	
3. Watchlist:
  * View watchlist
  * Only showing if logged in

4. Favourites
  * Only showing if logged in

5. Top 100:
  * Display as a clickable list with links
  * Add rating to list entries

6. Login:
  * Login for user

7. Spinner
  * While waiting for movie details
