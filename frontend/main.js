"use strict";

// Global Variables
let artists = []; // Store fetched artist data
let favorites = []; // Store user favorites

// Create the album-popup and overlay divs
const albumPopup = document.createElement('div');
const overlay = document.createElement('div');

albumPopup.classList.add('album-popup');
overlay.classList.add('overlay');

document.body.appendChild(albumPopup);
document.body.appendChild(overlay);

// Initial Setup
navigateToHomePage();

// Event Listeners for Navigation
document.getElementById('home').addEventListener('click', navigateToHomePage);
document.getElementById('artistsPage').addEventListener('click', navigateToArtistsPage);
document.getElementById('albumsPage').addEventListener('click', navigateToAlbumsPage);
document.getElementById('tracksPage').addEventListener('click', navigateToTracksPage);
document.getElementById('genrePage').addEventListener('click', navigateToGenrePage);
document.getElementById('favoritesPage').addEventListener('click', navigateToFavoritesPage);
document.getElementById('aboutPage').addEventListener('click', navigateToAboutPage);

// Overlay
overlay.addEventListener('click', function() {
    console.log("Overlay clicked!");
albumPopup.style.display = 'none';
overlay.style.display = 'none';
});

// Navigation Functions
function navigateToHomePage(event) {
    if (event) event.preventDefault();
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
        <h1>Welcome to Music Directory</h1>
        <p>Explore artists, albums, and tracks.</p>
    `;
}

function navigateToArtistsPage(event) {
    if (event) event.preventDefault();
    setupPageContent('artists', 'Search for artists...');
    fetchArtists();
}

function navigateToAlbumsPage(event) {
    if (event) event.preventDefault();
    setupPageContent('albums', 'Search for albums...');
    fetchAlbums();
}

function navigateToTracksPage(event) {
    if (event) event.preventDefault();
    setupPageContent('tracks', 'Search for tracks...');
    fetchTracks();
}

function navigateToGenrePage(event) {
    if (event) event.preventDefault();
    const contentDiv = document.getElementById('content');
    const uniqueGenres = [...new Set(artists.map(artist => artist.genre))];
    contentDiv.innerHTML = `
        <h2>Genres</h2>
        <ul>
            ${uniqueGenres.map(genre => `<li>${genre}</li>`).join('')}
        </ul>
    `;
}

function navigateToFavoritesPage(event) {
    if (event) event.preventDefault();
    const contentDiv = document.getElementById('content');
    const favoriteArtists = artists.filter(artist => favorites.includes(artist.id));
    contentDiv.innerHTML = `
        <h2>Favorites</h2>
        ${generateArtistsHTML(favoriteArtists)}
    `;
}

function navigateToAboutPage(event) {
    if (event) event.preventDefault();
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
        <h2>About Music Directory</h2>
        <p>This is a platform to explore various artists, their albums, and tracks. Dive into the world of music and discover something new today!</p>
    `;
}

// Utility Functions
function setupPageContent(sectionId, placeholderText) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
        <input type="text" id="searchBar" placeholder="${placeholderText}">
        <div id="${sectionId}"></div>
    `;

    document.getElementById('searchBar').addEventListener('input', function() {
        const query = this.value;
        if (query) {
            if (sectionId === 'artists') {
                searchArtists(query);
            } else if (sectionId === 'albums') {
                searchAlbums(query);
            } else if (sectionId === 'tracks') {
                searchTracks(query);
            }
        } else {
            if (sectionId === 'artists') {
                fetchArtists();
            } else if (sectionId === 'albums') {
                fetchAlbums();
            } else if (sectionId === 'tracks') {
                fetchTracks();
            }
        }
    });
}

// Fetch and Display Functions
function fetchArtists() {
    fetch('http://localhost:3006/artists')
        .then(response => response.json())
        .then(data => {
            artists = data;
            displayArtists(data);
        })
        .catch(error => console.error('Error fetching artists:', error));
}

function displayArtists(artistsList) {
    const artistContainer = document.getElementById('artists');
    artistContainer.innerHTML = generateArtistsHTML(artistsList);
}

function fetchAlbums() {
    fetch('http://localhost:3006/albums')
        .then(response => response.json())
        .then(albums => displayAlbums(albums))
        .catch(error => console.error('Error fetching albums:', error));
}

function displayAlbums(albums) {
    const albumContainer = document.getElementById('albums');
    let html = '';
    albums.forEach(album => {
        html += `
            <div class="album" data-album-id="${album.id}">
                <h2>${album.title}</h2>
                <p>Release Date: ${album.release_date}</p>
                <p>Artist ID: ${album.artist_id}</p>
            </div>
        `;
    });
    albumContainer.innerHTML = html;
}

function fetchTracks() {
    fetch('http://localhost:3006/tracks')
        .then(response => response.json())
        .then(tracks => displayTracks(tracks))
        .catch(error => console.error('Error fetching tracks:', error));
}

function displayTracks(tracks) {
    const trackContainer = document.getElementById('tracks');
    let html = '';
    tracks.forEach(track => {
        html += `
            <div class="track">
                <h2>${track.title}</h2>
                <p>Duration: ${track.duration}</p>
                <p>Album ID: ${track.album_id}</p>
            </div>
        `;
    });
    trackContainer.innerHTML = html;
}

// Album Popup Functionality
document.getElementById('content').addEventListener('click', async function(event) {
    if (event.target.closest('.album')) {
        const albumElement = event.target.closest('.album');
        if (!albumElement) {
            console.error("No album element found!");
            return;
        }
        const albumId = albumElement.getAttribute('data-album-id'); // Extract albumId from the clicked element
        console.log("Album clicked!");
        console.log("Album ID:", albumId);
        const albumTitle = albumElement.querySelector('h2').innerText;
        // Fetch tracks for the clicked album
        const tracks = await fetchTracksForAlbum(albumId);
        console.log("Fetched tracks:", tracks);

        // Generate the tracks list
        const tracksList = tracks.map(track => `<li>${track.title}</li>`).join('');

        albumPopup.innerHTML = `
            <div class="album-details">
                <h2>${albumTitle}</h2>
                <ul>
                    ${tracksList}
                </ul>
            </div>
        `;

// Display the popup and overlay
albumPopup.style.display = 'block';
overlay.style.display = 'block';

    }
});

// Fetch tracks for a specific album
async function fetchTracksForAlbum(albumId) {
    try {
        const response = await fetch(`http://localhost:3006/albums/${albumId}/tracks`);
        const tracks = await response.json();
        return tracks;
    } catch (error) {
        console.error('Error fetching tracks for album:', error);
        return [];
    }
}


// CRUD and Search Functions
// Create an artist
function createArtist(name, genre) {
    fetch('http://localhost:3006/artists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            genre: genre
        })
    })
    .then(response => response.json())
    .then(data => {
        artists.push(data);
        displayArtists(artists);
    })
    .catch(error => console.error('Error creating artist:', error));
}

// Update an artist
function updateArtist(id, name, genre) {
    fetch(`http://localhost:3006/artists/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            genre: genre
        })
    })
    .then(response => response.json())
    .then(data => {
        const index = artists.findIndex(artist => artist.id === id);
        if (index !== -1) {
            artists[index] = data;
            displayArtists(artists);
        }
    })
    .catch(error => console.error('Error updating artist:', error));
}


// Delete an artist
function deleteArtist(id) {
    fetch(`http://localhost:3006/artists/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        artists = artists.filter(artist => artist.id !== id);
        displayArtists(artists);
    })
    .catch(error => console.error('Error deleting artist:', error));
}

// Search functions for each section
function searchArtists(query) {
    fetch(`http://localhost:3006/artists/search?q=${query}`)
        .then(response => response.json())
        .then(data => displayArtists(data))
        .catch(error => console.error('Error searching artists:', error));
}

function searchAlbums(query) {
    fetch(`http://localhost:3006/albums/search?q=${query}`)
        .then(response => response.json())
        .then(data => displayAlbums(data))
        .catch(error => console.error('Error searching albums:', error));
}

function searchTracks(query) {
    fetch(`http://localhost:3006/tracks/search?q=${query}`)
        .then(response => response.json())
        .then(data => displayTracks(data))
        .catch(error => console.error('Error searching tracks:', error));
}

function toggleFavorite(artistId) {
    const index = favorites.indexOf(artistId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(artistId);
    }
    displayArtists(artists); // Re-render the artists to reflect the change
}


// Helper Function
function generateArtistsHTML(artistsList) {
    let html = '';
    artistsList.forEach(artist => {
        html += `
            <div class="artist-card" data-artist-id="${artist.id}">
                <div class="artist-image-container">
                    <img src="images/${artist.image}" alt="${artist.name}">
                    <div class="overlay">
                        <button class="play-btn">Play</button>
                    </div>
                </div>
                <div class="artist-info">
                    <h3>${artist.name}</h3>
                    <p>${artist.shortDescription}</p>
                </div>
                <div class="artist-actions">
                    <a href="${artist.website}" target="_blank" class="website-link">Visit Website</a>
                    <button class="favorite-btn" onclick="toggleFavorite(${artist.id})">${favorites.includes(artist.id) ? '❤️' : '🤍'}</button>
                </div>
            </div>
        `;
    });
    return html;
}
