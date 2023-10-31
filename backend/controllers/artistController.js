import * as artistService from "../services/artistService.js";
import { validationResult } from "express-validator";
import Artist from "../models/artistModel.js";

export const getArtistImage = async (req, res, next) => {
  const artistId = req.params.id;

  try {
    console.log(`Attempting to retrieve image for artist ID: ${req.params.id}`);

    const artist = await Artist.findByPk(artistId);

    if (!artist) {
      return res.status(404).send("Image not found for the specified artist.");
    }

    if (!artist.image) {
      console.error(`Error retrieving image for artist ID ${artistId}.`);
      return res.status(404).send("Image not found");
    }

    // Send the image data with the appropriate content type
    res.set("Content-Type", "image/jpg");
    res.send(artist.image);
  } catch (error) {
    console.error(`Error retrieving image for album ID ${artistId}:`, error);
    next(error);
  }
};

export const getAllArtists = async (req, res, next) => {
  try {
    const { sort, order, name, limit, offset } = req.query;

    const queryParams = {
      sort: sort,
      order: order,
      name: name,
      limit: limit,
      offset: offset,
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
    const albums = await artistService.getAlbumsByArtist(artistId);
    if (albums) {
      res.json(albums);
    } else {
      res.status(404).send("Artist not found");
    }
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
  try {
    console.log("Received request body:", req.body);

    // Handle validations
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
    }
  } catch (error) {
    next(error);
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
