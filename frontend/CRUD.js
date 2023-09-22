
// Create an artist
function createArtist(name, genre) {
        console.log("Creating artist with name:", name, "and genre:", genre); // Add this line
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
         console.log("Artist created:", data); 
        artists.push(data);
        displayArtists(artists);
    })
.catch(error => {
        console.error('Error creating artist:', error);
        console.log("Failed to create artist with name:", name, "and genre:", genre); // Add this line
    });
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


// Modify Albums

// Create an album
function createAlbum(title, artistId, releaseDate) {
    console.log(`Creating album: ${title}, Artist ID: ${artistId}, Release Date: ${releaseDate}`);
    fetch('http://localhost:3006/albums', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            artist_id: artistId,
            release_date: releaseDate
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Album created:", data);
        // Assuming 'albums' is an array that holds your albums
        albums.push(data);
        // Assuming 'displayAlbums' is a function that takes an array of albums and displays them
        displayAlbums(albums);
    })
    .catch(error => {
        console.error('Error creating album:', error);
    });
}

// Update an album
function updateAlbum(id, title, artistId, releaseDate) {
    console.log(`Updating album with ID ${id}: ${title}, Artist ID: ${artistId}, Release Date: ${releaseDate}`);
    fetch(`http://localhost:3006/albums/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            artist_id: artistId,
            release_date: releaseDate
        })
    })
    .then(response => response.json())
    .then(data => {
        const index = albums.findIndex(album => album.id === id);
        if (index !== -1) {
            albums[index] = data;
            displayAlbums(albums);
        }
    })
    .catch(error => {
        console.error('Error updating album:', error);
    });
}

// Delete an album
function deleteAlbum(id) {
    console.log(`Deleting album with ID ${id}`);
    fetch(`http://localhost:3006/albums/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        albums = albums.filter(album => album.id !== id);
        displayAlbums(albums);
    })
    .catch(error => {
        console.error('Error deleting album:', error);
    });
}


// Modify Tracks

// Create a track
function createTrack(title, albumId, duration) {
    console.log(`Creating track: ${title}, Album ID: ${albumId}, Duration: ${duration}`);
    fetch('http://localhost:3006/tracks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            album_id: albumId,
            duration: duration
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Track created:", data);
        // Assuming 'tracks' is an array that holds your tracks
        tracks.push(data);
        // Assuming 'displayTracks' is a function that takes an array of tracks and displays them
        displayTracks(tracks);
    })
    .catch(error => {
        console.error('Error creating track:', error);
    });
}

// Update a track
function updateTrack(id, title, albumId, duration) {
    console.log(`Updating track with ID ${id}: ${title}, Album ID: ${albumId}, Duration: ${duration}`);
    fetch(`http://localhost:3006/tracks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            album_id: albumId,
            duration: duration
        })
    })
    .then(response => response.json())
    .then(data => {
        const index = tracks.findIndex(track => track.id === id);
        if (index !== -1) {
            tracks[index] = data;
            displayTracks(tracks);
        }
    })
    .catch(error => {
        console.error('Error updating track:', error);
    });
}

// Delete a track
function deleteTrack(id) {
    console.log(`Deleting track with ID ${id}`);
    fetch(`http://localhost:3006/tracks/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        tracks = tracks.filter(track => track.id !== id);
        displayTracks(tracks);
    })
    .catch(error => {
        console.error('Error deleting track:', error);
    });
}

// Export block
export {
  createArtist,
  updateArtist,
  deleteArtist,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  createTrack,
  updateTrack,
  deleteTrack
};