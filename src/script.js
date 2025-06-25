const BASE_URL = "https://yts.mx/api/v2";

const searchInput = document.getElementById("search-movie");
const searchButton = document.querySelector("button");
const movieGrid = document.getElementById("movie-grid");
const movieList = document.getElementById("movie-list");

// ✅ Load watchlist from localStorage or initialize empty
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

// ✅ Search button click event
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query !== "") {
    searchMovies(query);
  }
});

// ✅ Fetch movie search results
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

// ✅ Display search results
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

// ✅ Show single movie details
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
            <button 
              id="myAddBtn" 
              data-id="${movie.id}" 
              data-title="${movie.title}">
              Add to Watchlist
            </button>
            <button onclick="window.location.reload()">Back to Search</button>
          </div>
        </div>
      `;

      // ✅ Add to Watchlist event
      const addBtn = document.getElementById("myAddBtn");
      addBtn.addEventListener("click", (e) => {
        const movieId = e.target.dataset.id;
        const movieTitle = e.target.dataset.title;
        addToWatchlist(movieId, movieTitle);
      });
    })
    .catch((err) => {
      console.error("Error fetching movie details:", err);
      movieGrid.innerHTML = "<p>Could not load movie details.</p>";
    });
}

// ✅ Add movie to watchlist
function addToWatchlist(id, title) {
  if (watchlist.find(movie => movie.id === id)) {
    alert("Movie already in watchlist!");
    return;
  }

  watchlist.push({ id, title });
  saveWatchlist();
  renderWatchlist();
}

// ✅ Render the watchlist
function renderWatchlist() {
  movieList.innerHTML = "";

  watchlist.forEach((movie, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${movie.title}</span>
      <button onclick="editWatchlist(${index})">Edit</button>
      <button onclick="deleteFromWatchlist(${index})">Delete</button>
    `;
    movieList.appendChild(li);
  });
}

// ✅ Edit movie in watchlist
function editWatchlist(index) {
  const newTitle = prompt("Enter new movie title:", watchlist[index].title);
  if (newTitle) {
    watchlist[index].title = newTitle;
    saveWatchlist();
    renderWatchlist();
  }
}

// ✅ Delete movie from watchlist
function deleteFromWatchlist(index) {
  if (confirm("Remove this movie from watchlist?")) {
    watchlist.splice(index, 1);
    saveWatchlist();
    renderWatchlist();
  }
}

// ✅ Save watchlist to localStorage
function saveWatchlist() {
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

// ✅ Initial render when page loads
renderWatchlist();
