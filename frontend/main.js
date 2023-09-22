"use strict";
import {
  createArtist,
  updateArtist,
  deleteArtist,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  createTrack,
  updateTrack,
  deleteTrack
} from './modify.js';

// Global Variables
let artists = []; // Store fetched artist data
let favorites = []; // Store user favorites
let albums = []; // store fetched album data
let lastViewedArtist = null; 

// Create the album-popup and overlay divs
const albumPopup = document.createElement('div');
const overlay = document.createElement('div');

const artistPopup = document.createElement('div');
artistPopup.classList.add('artist-popup');
document.body.appendChild(artistPopup);

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

// To hide the popup and overlay
overlay.addEventListener('click', function() {
    console.log("Overlay clicked!");
    albumPopup.classList.remove('active');
    overlay.classList.remove('active');
    artistPopup.classList.remove('active');
    overlay.classList.remove('active');
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

// Modify this function
function navigateToArtistsPage(event) {
    console.log("Navigating to Artists Page");
    if (event) event.preventDefault();
    setupPageContent('artists', 'Search for artists...');
    fetchArtists();

    // Add the "Create New Artist" button only on the Artists page
    const artistButtonContainer = document.getElementById('artistButtonContainer');
    artistButtonContainer.innerHTML = '<button id="showCreateArtistFormButton">Create New Artist</button>';

    // Attach event listener to the new button
    document.getElementById('showCreateArtistFormButton').addEventListener('click', showCreateArtistForm);
}

// Add this new function
function showCreateArtistForm(event) {
    console.log("Showing Create Artist Form");

    if(event) event.preventDefault();
  
    const formHTML =  `
        <h1>Create New Artist</h1>
        <form id="create-artist-form">
            <label for="name">Name:</label>
            <input type="text" id="name" required>
            <!-- Add other fields here -->
            <button type="submit">Create Artist</button>
        </form>
    `;

    document.getElementById('dynamicFormContainer').innerHTML = formHTML;

    // Add event listener for form submission
document.getElementById('create-artist-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const newArtist = {
        name: document.getElementById('name').value,
        birthdate: document.getElementById('birthdate').value,
        activeSince: document.getElementById('activeSince').value,
        genres: Array.from(document.querySelectorAll('input[name="genres"]:checked')).map(checkbox => checkbox.value),
        labels: document.getElementById('labels').value.split(',').map(s => s.trim()),
        website: document.getElementById('website').value,
        image: '', // Initialize image as an empty string
        shortDescription: document.getElementById('shortDescription').value
    };
    
    // Check which image source option is selected
    const uploadImageRadio = document.getElementById('uploadImage');
    if (uploadImageRadio.checked) {
        // Handle image upload
        const imageFile = document.getElementById('imageUpload').files[0];
        if (imageFile) {
            newArtist.image = imageFile.name;
        }
    } else {
        // Handle image link
        newArtist.image = document.getElementById('imageLinkInput').value;
    }

    createNewArtist(newArtist)
        .then(artist => {
            artists.push(artist); // Make sure artists is defined
            // showArtists(); // Make sure showArtists is defined

            document.getElementById('createArtistModal').style.display = "none";
            alert('Artist has been created :)');
        })
        .catch(error => {
            console.error("Error adding artist:", error);
            alert('There was an issue adding the artist. Please try again.');
        });
})};

function navigateToAlbumsPage(event) {
    if (event) event.preventDefault();
    setupPageContent('albums', 'Search for albums...');
    fetchArtists().then(() => fetchAlbums());
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

function fetchAlbums() {
    return fetch('http://localhost:3006/albums')
    .then(response => response.json())
    .then(data => {
        albums = data;
        displayAlbums(data)
    })
    .catch(error => console.error('Error fetching albums:', error));
}

function fetchTracks() {
    fetch('http://localhost:3006/tracks')
        .then(response => response.json())
        .then(tracks => displayTracks(tracks))
        .catch(error => console.error('Error fetching tracks:', error));
}

function fetchArtists() {
    return fetch('http://localhost:3006/artists')
        .then(response => response.json())
        .then(data => {
            artists = data.map(artist => ({
                ...artist,
                biography: artist.biography || 'Biography not available' // Add this line
            }));
            displayArtists(data);
        })
        .catch(error => console.error('Error fetching artists:', error));
}

function displayArtists(artistsList) {
    const artistContainer = document.getElementById('artists');
    artistContainer.innerHTML = generateArtistsHTML(artistsList);
}

function displayAlbums(albums) {
    const albumContainer = document.getElementById('albums');
    let html = '';
    console.log("Artists array:", artists);  // Debugging line
    albums.forEach(album => {
        console.log("Current album's artist_id:", album.artist_id);  // Debugging line
        const artist = artists.find(a => a.id === album.artist_id);
        const artistName = artist ? artist.name : 'Unknown Artist';
        
        html += `
            <div class="album" data-album-id="${album.id}">
                <img src="./images/${album.id}.jpg" alt="${album.title} Cover">
                <h2>${album.title}</h2>
                <p>Release Date: ${album.release_date}</p>
                <p>${artistName}</p>
            </div>
        `;
    });
    albumContainer.innerHTML = html;
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
        const tracksList = tracks.map((track, index) => `
            <li>
                <span class="track-number">${index + 1}.</span>
                <span class="track-title">${track.title}</span>
                <span class="track-duration">${track.duration}</span>
            </li>
        `).join('');

        albumPopup.innerHTML = `
            <div class="album-details">
                <img src="./images/${albumId}.jpg" alt="${albumTitle}" class="album-cover">
                <h2>${albumTitle}</h2>
                <ul class="track-list">
                    ${tracksList}
                </ul>
            </div>
        `;

        // Display the popup and overlay
        albumPopup.classList.add('active');
        overlay.classList.add('active');
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
                <button class="delete-artist" onclick="deleteArtist(${artist.id})">X</button>
                <div class="artist-image-container">
                    <img src="./artists/${artist.id}.jpg" alt="${artist.name}">
                    <div class="overlay">
                        <button class="play-btn">Play</button>
                    </div>
                </div>
                <div class="artist-info">
                    <h3>${artist.name}</h3>
                    <p>${artist.biography}</p>
                </div>
                <div class="artist-actions">
                    <button class="favorite-btn" onclick="toggleFavorite(${artist.id})">${favorites.includes(artist.id) ? '❤️' : '🤍'}</button>
                </div>
            <button class="update-artist" onclick="updateArtist(${artist.id})">Update</button>
            </div>
        `;
    });
    return html;
}

document.getElementById('content').addEventListener('click', function(event) {
    if (event.target.closest('.artist-card')) {
        const artistElement = event.target.closest('.artist-card');
        const artistId = artistElement.getAttribute('data-artist-id');
        const artist = artists.find(a => a.id === parseInt(artistId));
        if (artist) {
            displayArtistPopup(artist);
        }
    }
});


async function displayArtistPopup(artist) {
    lastViewedArtist = artist; // Store the artist being viewed
    console.log("Artist in Popup:", artist);  // Debugging line

    // Fetch albums if not already fetched
    if (!albums.length) {
        await fetchAlbums();
    }

    // Filter albums that belong to the artist
    const albumsOfArtist = albums.filter(album => album.artist_id === artist.id);
    console.log("Albums of Artist:", albumsOfArtist);  // Debugging line

    // Generate the album titles
    const albumTitles = albumsOfArtist.map(album => `
    <li data-album-id="${album.id}" class="clickable-album-title">${album.title}</li>`).join('');

    console.log("Album Titles:", albumTitles);  // Debugging line

    artistPopup.innerHTML = `
        <div class="artist-details">
            <img src="./artists/${artist.id}.jpg" alt="${artist.name}">
            <h2>${artist.name}</h2>
            <p>${artist.biography}</p>
            <ul>
                ${albumTitles}
            </ul>
        </div>
    `;
    artistPopup.classList.add('active');
    overlay.classList.add('active');
}

async function displayAlbumPopup(albumId) {
    const tracks = await fetchTracksForAlbum(albumId);
    const album = albums.find(a => a.id === parseInt(albumId));

      const tracksList = tracks.map((track, index) => `
        <li>
            <span class="track-number">${index + 1}.</span>
            <span class="track-title">${track.title}</span>
            <span class="track-duration">${track.duration}</span>
        </li>
    `).join('');

    albumPopup.innerHTML = `
        <div class="album-details">
            <img src="./images/${album.id}.jpg" alt="${album.title}" class="album-cover">
            <h2>${album.title}</h2>
            <ul class="track-list">
                ${tracksList}
            </ul>
            <button id="returnToArtist" class="return-icon"><i class="fas fa-arrow-left"></i></button>
        </div>
    `;

    artistPopup.classList.remove('active');  // Hide the artist popup
    albumPopup.classList.add('active');  // Show the album popup
    overlay.classList.add('active');

    document.getElementById('returnToArtist').addEventListener('click', function() {
        albumPopup.classList.remove('active'); // Hide the album popup
        if (lastViewedArtist) {
            displayArtistPopup(lastViewedArtist); // Show the artist popup again
        }
    });
}

artistPopup.addEventListener('click', function(event) {
    if (event.target.classList.contains('clickable-album-title')) {
        const albumId = event.target.getAttribute('data-album-id');
        displayAlbumPopup(albumId);
    }
});