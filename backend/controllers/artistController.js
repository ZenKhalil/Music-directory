import * as artistService from '../services/artistService.js';
import { validationResult } from 'express-validator';

export const getAllArtists = async (req, res, next) => {
    try {
        const { sort, order, name, limit, offset } = req.query;

        const queryParams = {
            sort: sort,
            order: order,
            name: name,
            limit: limit,
            offset: offset
        };

        const artists = await artistService.getAllArtists(queryParams);
        res.json(artists);
    } catch (error) {
        next(error);
    }
};

export const getAlbumsByArtist = async (req, res, next) => {
    try {
        const artistId = req.params.artistId;
        const albums = await albumService.getAlbumsByArtist(artistId);
        res.json(albums);
    } catch (error) {
        next(error);
    }
};

export const getArtistById = async (req, res, next) => {
    try {
        const artist = await artistService.getArtistById(req.params.id);
        res.json(artist);
    } catch (error) {
        next(error);
    }
};

export const createArtist = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

<<<<<<< Updated upstream
    try {
        const artist = await artistService.createArtist(req.body);
        res.status(201).json(artist);
    } catch (error) {
        next(error);
    }
};

export const updateArtist = async (req, res, next) => {
    try {
        const artist = await artistService.updateArtist(req.params.id, req.body);
        if (artist) {
            res.json(artist);
        } else {
            res.status(404).send('Artist not found');
        }
    } catch (error) {
        next(error);
=======
    // Ensure genres is processed as a comma-separated string
  let genres = req.body.genres; // instead of req.body.artist_genres
  if (typeof genres === "string") {
    genres = genres.split(", ").map((genre) => genre.trim());
  } else if (!Array.isArray(genres)) {
    return res.status(400).json({
      errors: [
        { msg: "Invalid genres format, it should be a string or an array." },
      ],
    });
  }

  const artistData = {
    name: req.body.name,
    biography: req.body.biography,
    genres: genres.join(", "), // using our processed genres array here
    image: req.file ? req.file.buffer : null,
  };

    const artist = await artistService.createArtist(artistData);
    res.status(201).json(artist);
  } catch (error) {
    next(error);
  }
};

export const updateArtist = async (req, res, next) => {
  try {
    console.log("Received request body:", req.body);

let genres = req.body.genres; // instead of req.body.artist_genres
if (typeof genres === "string") {
  genres = genres.split(", ").map((genre) => genre.trim());
}

const artistData = {
  name: req.body.name,
  biography: req.body.biography,
  genres: genres.join(", "), // using our processed genres array here
  image: req.file ? req.file.buffer : null,
};

    const artist = await artistService.updateArtist(req.params.id, artistData);
    if (artist) {
      res.json(artist);
    } else {
      res.status(404).send("Artist not found");
>>>>>>> Stashed changes
    }
};

export const deleteArtist = async (req, res, next) => {
    try {
        await artistService.deleteArtist(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export const searchArtists = async (req, res) => {
    try {
        const artists = await artistService.searchArtists(req.query.q);
        res.json(artists);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
