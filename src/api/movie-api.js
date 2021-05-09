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
    // return fetch(
    //   `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    // ).then(res => res.json())
    //  .then(data => {
    //    console.log(data);
    //    // Add release year member
    //    data.releaseYear = data.release_date.substring(0, 4);
    //    // Format runtime
    //    const hours = Math.floor(data.runtime / 60);
    //    const minutes = data.runtime % 60;
    //    data.runtime = hours + 'h' + minutes + 'm';
    //    // format user score
    //    //data.vote_average = convertToPercentage(data.vote_average);
    //    // Get production country
    //    data.productionCountry = data.production_countries[0].name;
    //    return data;
    //  })
  };