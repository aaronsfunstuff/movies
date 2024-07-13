document.addEventListener('DOMContentLoaded', function() {
    const wishlistMoviesList = document.getElementById('wishlistMoviesList');

    let wishlistMovies = JSON.parse(localStorage.getItem('wishlistMovies')) || [];

    wishlistMovies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `<h3>${movie.title}</h3>`;
        wishlistMoviesList.appendChild(movieElement);
    });
});
