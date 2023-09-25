async function showArtistsByGenre(genre) {
    isNavigatingToGenrePage = true; 
    removeCreateArtistButton();
    document.getElementById('genreModal').style.display = 'none';
    
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '<div class="genre-page"></div>';
    const genrePageDiv = document.querySelector('.genre-page');
    
    // Declare these variables at a higher scope
    let artistListHTML = '';
    let albumListHTML = '';
    
    // Add checkboxes for toggling artists and albums
    let toggleHTML = `
        <div class="toggle-options">
            <input type="checkbox" id="showArtists" checked>
            <label for="showArtists">Show Artists</label>
            <input type="checkbox" id="showAlbums" checked>
            <label for="showAlbums">Show Albums</label>
        </div>
    `;

    if (genrePageDiv) {
        const filteredArtists = artists.filter(artist => artist.genres.includes(genre));
        artistListHTML = `<h1 class="genre">${genre}</h1>`;
        let rowOpen = false;

            filteredArtists.forEach((artist, index) => {
            if (index % 4 === 0) {
                artistListHTML += `<div class="artist-row">`;
                rowOpen = true;
            }

            const imageName = `${artist.id}.jpg`;
            artistListHTML += `
                <div class="artist-card">
                    <img src="./artists/${imageName}" alt="${artist.name}">
                    <h3>${artist.name}</h3>
                    <p>${artist.biography}</p>
                    <button class="favorite-btn" data-artist-id="${artist.id}" onclick="event.stopPropagation(); toggleFavorite(${artist.id})">${favorites.includes(artist.id) ? '❤️' : '🤍'}</button>
                </div>
            `;

            if ((index + 1) % 4 === 0 || index === filteredArtists.length - 1) {
                artistListHTML += `</div>`;
                rowOpen = false;
            }
        });

        const filteredAlbums = albums.filter(album => {
            const artist = artists.find(a => a.id === album.artist_id);
            return artist && artist.genres.includes(genre);
        });

        albumListHTML = '<h2>Albums</h2>';
        for (const album of filteredAlbums) {
            const tracks = await fetchTracksForAlbum(album.id);  // Fetch tracks for each album
            let songListHTML = '<ul>';
            tracks.forEach((track, i) => {
                songListHTML += `<li>${i + 1}. ${track.title} ${track.duration}</li>`;
            });
            songListHTML += '</ul>';

            albumListHTML += `
                <div class="album-card">
                    <img src="./albums/${album.id}.jpg" alt="${album.title}">
                    <h3>${album.title}</h3>
                    <p>Release Date: ${album.release_date}</p>
                    ${songListHTML}
                </div>`;
        }

        // Combine toggle options, artist list, and album list
        genrePageDiv.innerHTML = toggleHTML + artistListHTML + albumListHTML;

        // Add event listeners to checkboxes to toggle visibility
        document.getElementById('showArtists').addEventListener('change', function() {
            const artistCards = document.querySelectorAll('.artist-card');
            artistCards.forEach(card => {
                card.style.display = this.checked ? 'block' : 'none';
            });
        });

        document.getElementById('showAlbums').addEventListener('change', function() {
            const albumCards = document.querySelectorAll('.album-card');
            albumCards.forEach(card => {
                card.style.display = this.checked ? 'block' : 'none';
            });
        });

    } else {
        console.error('genre-page div not found');
    }
}
