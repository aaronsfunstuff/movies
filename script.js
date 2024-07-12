const apiKey = '1c8b3468'; // Replace with your actual API key
const apiUrl = 'https://www.omdbapi.com/';

const recommendedMovies = [
    'tt0111161', // The Shawshank Redemption
    'tt0068646', // The Godfather
    'tt0071562', // The Godfather: Part II
    'tt0468569', // The Dark Knight
    'tt0167260'  // The Lord of the Rings: The Return of the King
];

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
                    Poster: data.Poster
                };

                const movieElement = createMovieElement(movie);
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
            setupPagination(data.totalResults);
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
            const movieElement = createMovieElement(movie);
            moviesList.appendChild(movieElement);
        });
    } else {
        moviesList.innerHTML = '<p>No movies found.</p>';
    }
}

function createMovieElement(movie) {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    movieElement.innerHTML = `
        <h2>${movie.Title} (${movie.Year})</h2>
        <p><strong>IMDB ID:</strong> ${movie.imdbID}</p>
        <img src="${movie.Poster}" alt="${movie.Title} poster" width="150">
    `;

    return movieElement;
}

function setupPagination(totalResults) {
    const totalPages = Math.ceil(totalResults / 10); 
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.addEventListener('click', () => {
            currentPage = i;
            searchMovies();
        });
        paginationElement.appendChild(button);
    }
}


