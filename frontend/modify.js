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

// Få en unik liste over genrer
function getUniqueGenres() {
    const genres = new Set();
    artists.forEach(artist => {
        artist.genres.forEach(genre => {
            genres.add(genre);
        });
    });
    return [...genres];
}

// Vis genrer i modal
function showGenre(event) {
    if(event) event.preventDefault();
    const uniqueGenres = getUniqueGenres();

let genreListHTML = '';
uniqueGenres.forEach((genre, index) => {
    if (index % 5 === 0) genreListHTML += `<div class="genre-row">`; // Begin a new row every 5 items

    genreListHTML += `<div class="genre-icon" onclick="showArtistsByGenre('${genre}')">
        <img src="/images/genre-icons/${genre}.png" alt="${genre}"> 
        <p>${genre}</p>
    </div>`;

    if ((index + 1) % 5 === 0 || index === uniqueGenres.length - 1) genreListHTML += `</div>`; // End the row
});
    document.getElementById('genre-content').innerHTML = genreListHTML;
    document.getElementById('genreModal').style.display = "block";
}

// Vis kunstnere baseret på genre
function showArtistsByGenre(genre) {
    const contentDiv = document.getElementById('content');
    currentGenre = genre; 
    const filteredArtists = artists.filter(artist => artist.genres.includes(genre));
    let artistListHTML = `<h1 class="genre">${genre}</h1>`;
    filteredArtists.forEach(artist => {
        artistListHTML += `
            <div class="artist-card">
                <img src="/images/${artist.image}" alt="${artist.name}">
                <h3>${artist.name}</h3>
                <p>${artist.biography}</p>
                <button onclick="toggleFavorite(${artist.id})">${favorites.includes(artist.id) ? 'Remove from Favorites' : 'Add to Favorites'}</button>
            </div>`;
    });
   contentDiv.innerHTML = artistListHTML;
    history.pushState({ view: 'genre', genre: genre }, '', '/genre/' + genre);
    document.getElementById('genreModal').style.display = "none";
}

function handleCreateArtistFormSubmission(event) {
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

    // Function from rest-service.js to create the artist.
    createNewArtist(newArtist)
        .then(artist => {
            artists.push(artist);
            showArtists();

            document.getElementById('createArtistModal').style.display = "none";
            alert('Artist has been created :)');
        })
        .catch(error => {
            console.error("Error adding artist:", error);
            alert('There was an issue adding the artist. Please try again.');
        });
}

document.getElementById('showCreateArtistFormButton').addEventListener('click', showCreateArtistForm);

function showCreateArtistForm(event) {
  if(event) event.preventDefault();
  
  // Assuming you have a function getUniqueGenres() that returns an array of unique genres
  const uniqueGenres = getUniqueGenres(); 

  const genreBobbles = uniqueGenres.map(genre => `
      <input type="checkbox" id="genre-${genre}" name="genres" value="${genre}">
      <label class="genre-bobble" for="genre-${genre}">
          <span>${genre}</span>
      </label>
  `).join('');

  const formHTML =  `
      <h1 id="createText">Create New Artist</h1>
      <form id="create-artist-form">
          <label for="name">Name:</label>
          <input type="text" id="name" required>
          <!-- Add other fields here -->
          <label>Genres:</label>
          <div id="genres-bobbles">
              ${genreBobbles}
          </div>
          <button type="submit">Create Artist</button>
      </form>
  `;

  document.getElementById('dynamicFormContainer').innerHTML = formHTML;

  // Add event listener for form submission
  document.getElementById('create-artist-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Your code to handle form submission, e.g., createArtist()
  });
}
