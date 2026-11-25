Spotify Clone

A Spotify-inspired music search and preview app built with vanilla JavaScript, SCSS, and Node.js. Search by song title or artist, browse album artwork, and play available track previews.

Try the live demo

Try searching for Tarkan or Sezen Aksu, then select a result to play its preview. The opening screen shows a selection of NEFFEX tracks.

How it works

The browser sends the search term to the Node.js endpoint GET /api/search?q=.... The backend calls the Shazam API through RapidAPI and returns a list of tracks. The frontend displays each track’s title, artist, and artwork, and uses the preview URL when one is available. The RapidAPI key is read by the server from an environment variable.

|Layer     |Stack                               |Hosting     |
|----------|------------------------------------|------------|
|Frontend  |HTML, SCSS, vanilla JavaScript      |GitHub Pages|
|Backend   |Node.js and its built-in HTTP module|Render      |
|Music data|Shazam API via RapidAPI             |RapidAPI    |

Run locally

	1.	Clone the repository and open the project folder.

git clone https://github.com/HasanKoparan/spotify-clone.git

cd spotify-clone

	2.	With Node.js 24 and access to the Shazam API on RapidAPI, create a file named .spotify-clone.env in your home directory. Replace the placeholder with your own key. Keep the file outside the repository.

RAPIDAPI_KEY=your_key_here

	3.	Start the backend from the project folder.

node --env-file="$HOME/.spotify-clone.env" js/server.mjs

	4.	Open index.html with VS Code Live Server at http://127.0.0.1:5500/index.html. The frontend will use the local backend on port 3000.

This project was built for learning how to connect a vanilla JavaScript frontend to a deployed Node.js backend. Spotify and Shazam are third-party brands.

Author

Hasan Koparan · Connect on LinkedIn · See more projects on GitHub
