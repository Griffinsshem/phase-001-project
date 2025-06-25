const BASE_URL = "https://yts.mx/api/v2";

const searchInput = document.getElementById("search-movie");
const searchButton = document.querySelector("button");
const movieGrid = document.getElementById("movie-grid");
const movieList = document.getElementById("movie-list");
const addButton = document.getElementById("myAddBtn")


searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query !== "") {
    searchMovies(query);
  }
});


function searchMovies(query) {
  fetch(`${BASE_URL}/list_movies.json?query_term=${encodeURIComponent(query)}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.data.movies && data.data.movies.length > 0) {
        displayMovies(data.data.movies);
      } else {
        movieGrid.innerHTML = "<p>No movies found.</p>";
      }
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      movieGrid.innerHTML = "<p>Something went wrong. Try again later.</p>";
    });
}

function displayMovies(movies) {
  movieGrid.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";
    movieCard.innerHTML = `
      <img src="${movie.medium_cover_image}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>${movie.year}</p>
    `;

    movieCard.addEventListener("click", () => {
      showMovieDetails(movie.id);
    });

    movieGrid.appendChild(movieCard);
  });
}

function showMovieDetails(movieId) {
  fetch(`${BASE_URL}/movie_details.json?movie_id=${movieId}`)
    .then((res) => res.json())
    .then((data) => {
      const movie = data.data.movie;
      movieGrid.innerHTML = `
        <div class="movie-detail">
           <img src="${movie.large_cover_image}" alt="${movie.title}" />
           <div class="movie-info">
            <h2>${movie.title} (${movie.year})</h2>
            <p><strong>Rating:</strong> ${movie.rating}</p>
            <p><strong>Runtime:</strong> ${movie.runtime} minutes</p>
            <p><strong>Genres:</strong> ${movie.genres.join(", ")}</p>
            <p>${movie.description_full}</p>
            <button id="myAddBtn">Add to Watchlist</button>
            <button onclick="window.location.reload()">Back to Search</button>
           </div>
         </div>
       `;
    })
    .catch((err) => {
      console.error("Error fetching movie details:", err);
      movieGrid.innerHTML = "<p>Could not load movie details.</p>";
    });
}

addButton.addEventListener("submit", () => {
  su
})