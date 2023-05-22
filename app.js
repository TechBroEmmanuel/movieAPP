const apiURL = 'https://api.themoviedb.org/3/movie/popular?api_key=2969cb5dab804fa038e6147c4bca25d4';
const imgURL = "https://image.tmdb.org/t/p/w1280/"
const trendingUrl = 'https://api.themoviedb.org/3/trending/movie/day?api_key=2969cb5dab804fa038e6147c4bca25d4';
const seriesUrl = 'https://api.themoviedb.org/3/tv/popular?api_key=2969cb5dab804fa038e6147c4bca25d4';

const search = document.getElementById('search');
const form = document.getElementById('form');
const main = document.getElementById('main');

const movie_cards = document.getElementsByClassName('movie_cards')[0];
const movie_cards_series = document.getElementsByClassName('movie_cards_series')[0];



viewAllLink = document.querySelector('.trending_top a');
viewAllSeries = document.getElementById('view_all')

// Variable to store the initial 5 movies
let initialMovies = [];

//left and right sliding
const movieContainer = document.querySelector('.movie_cards');
const prevButton = document.querySelector('.left_nextIcon');
const nextButton = document.querySelector('.right_nextIcon');

let movieIndex = 0;
//add event listeners to next and prev buttons
prevButton.addEventListener('click', () => {
    movieIndex = Math.max(movieIndex - 1, 0) //movie index should never be negative
    showMovies(initialMovies, movie_cards)
})

// Add event listener to the next button
nextButton.addEventListener('click', () => {
    movieIndex = Math.min(movieIndex + 1, initialMovies.length - 1) 
    showMovies(initialMovies, movie_cards);
});

//get trending movies with initial 5 movies only
trendingMovies(trendingUrl)

// // Add a click event listener to the "View All" link
// viewAllLink.addEventListener('click', () => {
//     if (initialMovies.length > 0) {
//     // Call the trendingMovies function again to fetch and display all the trending movies

//     } else {
//         // Show the initial 5 movies again
//         showMovies(initialMovies, movie_cards);
//    }
// });


async function trendingMovies(url) {
    const response = await fetch(url);
    const jsonData = await response.json();
    initialMovies = jsonData.results;
    // if (limit) {
    //     movies = movies.slice(0, limit); //keep only the first 5 movies
    //     initialMovies = [...movies];
    // } 
    

    showMovies(initialMovies, movie_cards, movieIndex);

   
}

const showMovies = (movies, container) => {
    container.innerHTML = '';
    movies.forEach((movie, i) => {
        const { title, poster_path } = movie;
        const card = document.createElement('div')
        card.classList.add('movie_card');
         card.style.transform = `translateX(${(i - movieIndex) * 2}rem)`;
        card.innerHTML = `
        <img src="${imgURL + poster_path}" alt="${title}"/>  
         `


        container.appendChild(card);

    })
    container.style.width = `${movies.length * 18}rem`;
};

viewAllSeries.addEventListener('click', () => {
    // Call the trendingMovies function again to fetch and display all the trending movies
    series(seriesUrl)
});
//get series 
series(seriesUrl, 3)
async function series(url, limit = null) {
    const response = await fetch(url);
    const jsonData = await response.json();
    let seriesData = jsonData.results;
    console.log(seriesData)
    if (limit) {
        seriesData = seriesData.slice(0, limit);
    }
    showSeries(seriesData, movie_cards_series);
}

// Get movies
// getMovies(apiURL);

// async function getMovies(url) {
//     const response = await fetch(url);
//     const jsonData = await response.json();
//     console.log(jsonData.results);
//     showMovies(jsonData.results);
//     const screamMovie = jsonData.results.find(movie => movie.title === "Scream VI");
//     if (screamMovie) {
//         const body = document.getElementById('body');
//         body.style.backgroundImage = `url(${imgURL + screamMovie.backdrop_path})`;
//         body.innerHTML = `
//       <div class="movie-info">
//         <h2 class="movie-title">${screamMovie.title}</h2>
//         <p class="release-date"> ${screamMovie.release_date}</p>
//         <div>
//         <button class="play-button">Play</button>
//         <button class="plus">+</button>
//         </div>
//         <p class="movie-overview">${screamMovie.overview}</p>

//       </div>
//     ` + body.innerHTML;
//     }

// }

// const showMovies = (movies) => {
//     main.innerHTML = '';
//     movies.forEach((movie) => {
//         const { title, vote_average, poster_path, overview, backdrop_path } = movie;
//         const movieDiv = document.createElement('div')
//         movieDiv.classList.add('movie');
//         movieDiv.style.backgroundImage = `url(${imgURL+backdrop_path})`
//         movieDiv.innerHTML = `
//         <img src="${imgURL+poster_path}" alt="${title}"/>;
//         <div class='movie-info'>
//         <h3>${title}</h3>
//         <span class=''>${vote_average}</span>
//         <div class='overview'>
//         <h3>Overview</h3>
//         ${overview}
//         </div>
//         </div>

//         `
//         main.appendChild(movieDiv);

//     })
// };


const showSeries = (series, container) => {
    container.innerHTML = '';
    series.forEach((item) => {
        const { original_name, poster_path, vote_average, overview, first_air_date } = item;
        const card = document.createElement('div')
        card.innerHTML = `
        <img src="${imgURL + poster_path}" alt="${original_name}"/>  
         `;
        card.classList.add('movie_card_series');

        const cardDetails = document.createElement('div');
        cardDetails.classList.add('card_details');
        //limit the overview to a maximum of limited words
        const words = overview.split(' ');
        const limitedWords = words.slice(0, 20).join(' ');
        cardDetails.innerHTML = ` 
            <p class="card_titile">${original_name}<span>${first_air_date}</span></p>
            <p class="card_space">25.26 EP<span></span>3.86 GB</p>
            <p class="card_text">${limitedWords}...</p>
            <div class="hero_play_div">
              <p class="hero_play"><i class="fa fa-play"></i> play</p>
              <p class="paly_plus_icon"><i class="fa fa-arrow-down"></i> </p>
            </div>
        `
       
        card.appendChild(cardDetails)
        container.appendChild(card);

    })
};

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const searchData = search.value;
//     if (searchData && searchData !== '') {
//         getMovies(apiURL + searchData);
//         search.value = ''; // Reset the search input field
//     } else {
//         window.location.reload();
//     }
// });

// // const apiURL = 'https://api.themoviedb.org/3/search/movie?api_key=2969cb5dab804fa038e6147c4bca25d4&query=';
// const imgURL = "https://image.tmdb.org/t/p/w1280/";

// const search = document.getElementById('search');
// const form = document.getElementById('form');
// const main = document.getElementById('main');

// // Get movies
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const searchData = search.value;
//     if (searchData && searchData !== '') {
//         const searchURL = apiURL + searchData;
//         getMovies(searchURL);
//         search.value = ''; // Reset the search input field
//     } else {
//         window.location.reload();
//     }
// });

// async function getMovies(url) {
//     const response = await fetch(url);
//     const jsonData = await response.json();
//     console.log(jsonData);
//     showMovies(jsonData.results);
// }

// const showMovies = (movies) => {
//     main.innerHTML = '';
//     movies.forEach((movie) => {
//         createMovieElement(movie);
//     });
// };

// function createMovieElement(movie) {
//     const { title, vote_average, poster_path, overview } = movie;
//     const movieDiv = document.createElement('div');
//     movieDiv.classList.add('movie');
//     movieDiv.innerHTML = `
//         <img src="${imgURL}${poster_path}" alt="${title}" />
//         <div class='movie-info'>
//             <h3>${title}</h3>
//             <span class=''>${vote_average}</span>
//         </div>
//         <div class='overview'>
//             <h3>Overview</h3>
//             ${overview}
//         </div>
//     `;
//     main.appendChild(movieDiv);
// }
