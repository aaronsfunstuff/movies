const apiKey = '1c8b3468'; // Replace with your actual API key
const apiUrl = 'https://www.omdbapi.com/';

function searchMovies() {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput === '') {
        alert('Please enter a movie title to search.');
        return;
    }

    const url = `${apiUrl}?apikey=${apiKey}&s=${searchInput}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.Search);
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
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');

            const title = movie.Title;
            const year = movie.Year;
            const imdbID = movie.imdbID;
            const poster = movie.Poster;

            movieElement.innerHTML = `
                <h2>${title} (${year})</h2>
                <p><strong>IMDB ID:</strong> ${imdbID}</p>
                <img src="${poster}" alt="${title} poster" width="150">
            `;

            moviesList.appendChild(movieElement);
        });
    } else {
        moviesList.innerHTML = '<p>No movies found.</p>';
    }
}
