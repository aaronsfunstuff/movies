const apiKey = '1c8b3468'; 
const apiUrl = 'https://www.omdbapi.com/';

const recommendedMovies = [
    'tt0111161', // The Shawshank Redemption
    'tt0068646', // The Godfather
    'tt0071562', // The Godfather: Part II
    'tt0468569', // The Dark Knight
    'tt0167260'  // The Lord of the Rings: The Return of the King
];

let watchlist = [];

window.onload = function() {
    displayRecommendedMovies();
};

function displayRecommendedMovies() {
    const recommendedMoviesList = document.getElementById('recommendedMoviesList');

    recommendedMovies.forEach(movieId => {
        const url = `${apiUrl}?apikey=${apiKey}&i=${movieId}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const movie = {
                    Title: data.Title,
                    Year: data.Year,
                    imdbID: data.imdbID,
                    Poster: data.Poster,
                    Rating: data.imdbRating
                };

                const movieElement = createMovieElement(movie, true);
                recommendedMoviesList.appendChild(movieElement);
            })
            .catch(error => {
                console.error('Error fetching recommended movie:', error);
            });
    });
}

function searchMovies() {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput === '') {
        alert('Please enter a movie title to search.');
        return;
    }

    const url = `${apiUrl}?apikey=${apiKey}&s=${searchInput}`;

    // Clear recommended movies list
    const recommendedMoviesList = document.getElementById('recommendedMoviesList');
    recommendedMoviesList.innerHTML = '';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.Search);
            setupPagination(data.totalResults, searchInput);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching data. Please try again later.');
        });
}

function displayMovies(movies) {
    const moviesList = document.getElementById('moviesList');
    moviesList.innerHTML = '';

    if (movies) {
        movies.forEach(movie => {
            const url = `${apiUrl}?apikey=${apiKey}&i=${movie.imdbID}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const movieDetails = {
                        Title: data.Title,
                        Year: data.Year,
                        imdbID: data.imdbID,
                        Poster: data.Poster,
                        Rating: data.imdbRating,
                        Plot: data.Plot,
                        Genre: data.Genre,
                        Director: data.Director,
                        Actors: data.Actors
                    };

                    const movieElement = createMovieElement(movieDetails, false);
                    moviesList.appendChild(movieElement);
                })
                .catch(error => {
                    console.error('Error fetching movie details:', error);
                });
        });
    } else {
        moviesList.innerHTML = '<p>No movies found.</p>';
    }
}

function createMovieElement(movie, isRecommended) {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.dataset.imdbID = movie.imdbID;

    movieElement.innerHTML = `
        <h2>${movie.Title} (${movie.Year})</h2>
        <p><strong>Rating:</strong> ${movie.Rating}</p>
        <img src="${movie.Poster}" alt="${movie.Title} poster" width="150">
        <button onclick="showMovieDetails('${movie.imdbID}')">View Details</button>
    `;

    if (isRecommended) {
        const addToWatchlistButton = document.createElement('button');
        addToWatchlistButton.innerText = 'Add to Watchlist';
        addToWatchlistButton.addEventListener('click', () => addToWatchlist(movie));
        movieElement.appendChild(addToWatchlistButton);
    }

    return movieElement;
}

function showMovieDetails(imdbID) {
    const url = `${apiUrl}?apikey=${apiKey}&i=${imdbID}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const movieDetails = {
                Title: data.Title,
                Year: data.Year,
                Rated: data.Rated,
                Released: data.Released,
                Runtime: data.Runtime,
                Genre: data.Genre,
                Director: data.Director,
                Actors: data.Actors,
                Plot: data.Plot,
                Poster: data.Poster,
                imdbRating: data.imdbRating
            };

            displayMovieModal(movieDetails);
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
        });
}

function displayMovieModal(movie) {
    alert(`
        Title: ${movie.Title} (${movie.Year})
        Rated: ${movie.Rated}
        Released: ${movie.Released}
        Runtime: ${movie.Runtime}
        Genre: ${movie.Genre}
        Director: ${movie.Director}
        Actors: ${movie.Actors}
        Rating: ${movie.imdbRating}
        Plot: ${movie.Plot}
    `);
}

function addToWatchlist(movie) {
    if (!watchlist.some(item => item.imdbID === movie.imdbID)) {
        watchlist.push(movie);
        alert(`"${movie.Title}" added to your watchlist.`);
    } else {
        alert(`"${movie.Title}" is already in your watchlist.`);
    }
}

function setupPagination(totalResults, searchInput) {
    const totalPages = Math.ceil(totalResults / 10); // 10 items per page
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.addEventListener('click', () => {
            currentPage = i;
            searchMovies(searchInput);
        });
        paginationElement.appendChild(button);
    }
}


