# G-MovieMate Search Hub

Welcome to G-MovieMate Search Hub, a Single Page Application (SPA) built with HTML, CSS, and JavaScript that allows users to search for movies, view their details, and manage a local watchlist.

## Project Structure

```
project-root/
│
├── index.html              # Main HTML page
├── styles/
│   └── styles.css          # Styling for layout and components
├── src/
│   └── script.js           # JavaScript logic for API, rendering, watchlist
└── README.md               # Project documentation (this file)
```

## Features

    - Search movies using the YTS API.

    - Display movie results in a responsive grid layout.

    - View detailed movie information (title, rating, runtime, genres, full description).

    - Add movies to a Watchlist stored in LocalStorage.

    - Remove movies from the Watchlist.

    - State Persistence: Watchlist data is saved in browser storage.

## Technologies Used

    - HTML5 – Semantic layout and structure

    - CSS3 – Responsive and styled UI

    - JavaScript (Vanilla) – Dynamic DOM manipulation, Fetch API

    - YTS API – For movie search and detail data

    - LocalStorage – Watchlist persistence

## UI Overview

    - Header: Fixed top navigation with app branding.

    - Search Input: Text field + button to trigger search.

    - Movie Grid: Displays search results as movie cards.

    - Movie Details: On-click detail view with more info and action buttons.

    - Watchlist: Displayed as a simple ordered list with delete option.

    - Footer: Fixed bottom with copyright.

## How It Works

    - User enters a movie title in the input box and clicks "Search".

    - JavaScript uses fetch() to call the YTS API with the query term.

    - If movies are found, each is displayed as a movie card.

    - Clicking on a movie displays its details view, including:

        - Poster

        - Title & Year

        - Rating, Runtime, Genres

        - Full Description

    - Users can click "Add to Watchlist" to save a movie locally.

    - Watchlist is displayed below and persists on page reload.

## Example API Endpoints Used

    Search Movies:

   - https://yts.mx/api/v2/list_movies.json?query_term=batman

## Get Movie Details:

   - https://yts.mx/api/v2/movie_details.json?movie_id=12345

## Key JavaScript Functions

- searchMovies()	Fetches movies based on user query
- displayMovies()	Renders movie cards into the grid
- showMovieDetails()	Fetches and shows a single movie’s detail view
- addToWatchlist()	Adds a movie to the local watchlist
- renderWatchlist()	Renders all saved movies in the watchlist
- deleteFromWatchlist()	Removes a movie from the watchlist
- saveWatchlist()	Persists watchlist to localStorage

## Local Development

To run the project locally:

    - Clone or download this repository.

    - Ensure files are structured like this:

```
project-folder/
├── index.html
├── styles/
│   └── styles.css
├── src/
│   └── script.js
```

    - Open index.html in any modern browser.

## Future Enhancements

    - Add "Edit Watchlist" functionality.

    - Allow export/import of watchlist.

    - Add dark mode toggle.

    - Integrate more APIs (like OMDb for more metadata).


## Limitations

    - Only uses the YTS API which may not return very old or obscure movies.

    - No backend or user authentication implemented.

## License

This project is licensed under the MIT License.

## Acknowledgements

    - YTS.mx API for providing free movie data.

## Author

 Name: Griffins Ondeyo

 GitHub: @Griffinsshem
