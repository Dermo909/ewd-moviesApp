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

    // return fetch(
    //   `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
    // ).then(res => res.json())
    //   .then(data => {
    //     console.log('Cast and crew: ', data);
    //     const filteredData = [];
    //     // Get some details
    //     // There might be more than one of each but we're only interested in one
    //     filteredData.director = data.crew.filter(x => x.known_for_department === 'Directing')[0];
    //     filteredData.writer = data.crew.filter(x => x.known_for_department === 'Writing')[0];
    //     filteredData.producer = data.crew.filter(x => x.known_for_department === 'Production')[0];
  
    //     if (filteredData.director === undefined) {
    //       filteredData.director = "<none specified>";
    //     }
    //     if (filteredData.writer === undefined) {
    //       filteredData.writer = "<none specified>";
    //     }
    //     if (filteredData.producer === undefined) {
    //       filteredData.producer = "<none specified>";
    //     }
    //     // Order the actors by popularity 
    //     // Front end will decide how many to show
    //     filteredData.sortedActors = Object.keys(data.cast).sort(function(a,b){
    //                         return data.cast[a.popularity]-data.cast[b.popularity]
    //                         }).map(key => data.cast[key]);
    //                         console.log(filteredData.sortedActors);
    //     return filteredData;
    //   })
  };