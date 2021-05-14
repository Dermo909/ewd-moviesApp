export const login = async (username, password) => {
    console.log('username: ', username);
    console.log('password: ', password);
    const res = await fetch('/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    console.log('login res.json: ', res.json);
    return res.json();
};

export const signup = async (username, password) => {
    const res = await fetch('/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    })
    console.log('signup res.json: ', res.json);
    return res.json();
};

export const getMovies = async () => {
    const res = await fetch(
        '/api/movies', {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
    }
    )

    return res.json();
};

export const getMovie = async (id) => {
    console.log('Getting movie id: ', id);
    const url = `/api/movies/${id}`;
    const res = await fetch(
        url, {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
    }
    )

    return res.json();

  };

  export const getCastAndCrew = async (id) => {
    console.log('Getting cast and crew for movie id: ', id);
    const url = `/api/castAndCrew/${id}`;
    const res = await fetch(
        url, {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
    }
    )
    return res.json();

  };

  export const addMovieToFavourites = async (username, id) => {
      console.log('Adding to favourites');
      const url = `/api/users/${username}/favourites`;
      console.log('url', url);
    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'post',
        body: JSON.stringify({ username: username, id: id })
    })

    return res.json();
};

export const getUserFavourites= async (username) => {
    username = 'user1';
    console.log('movie api, Getting favourites');
    const url = `/api/users/${username}/favourites`;
    console.log('url', url);
  const res = await fetch(url, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': window.localStorage.getItem('token')
      },
      method: 'get'
  })

  return res.json();
};

export const addMovieToWatchlist = async (username, id) => {
    console.log('Adding to watchlist');
    const url = `/api/users/${username}/watchlist`;
    console.log('url', url);
  const res = await fetch(url, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': window.localStorage.getItem('token')
      },
      method: 'post',
      body: JSON.stringify({ username: username, id: id })
  })

  return res.json();
};