import * as albumService from "../services/albumService.js";
import * as trackService from "../services/trackService.js";
import Album from "../models/albumModel.js";

//export const uploadAlbumImage = async (req, res, next) => {
//  try {
//    const albumData = req.body;
//    const imageFile = req.file; // Assuming you're using something like multer for file handling
//    const album = await createAlbumWithImage(albumData, imageFile);
//    res.status(201).json(album);
//  } catch (error) {
//    next(error);
//  }
//};

export const retrieveAlbumImage = async (req, res, next) => {
  const albumId = req.params.id;

  try {
    console.log(`Attempting to retrieve image for album ID: ${albumId}`);

    const album = await Album.findByPk(albumId);

    if (!album) {
      return res.status(404).send("Album not found");
    }

    if (!album.image) {
      console.error(`No image associated with album ID ${albumId}.`);
      return res.status(404).send("Image not found");
    }

    // Send the image data with the appropriate content type
    res.set("Content-Type", "image/jpg");
    res.send(album.image);
  } catch (error) {
    console.error(`Error retrieving image for album ID ${albumId}:`, error);
    next(error);
  }
};
export const getAllAlbums = async (req, res, next) => {
  try {
    const { sort, order, release_date, title, limit, offset } = req.query;

    const queryParams = {
      sort: sort,
      order: order,
      release_date: release_date,
      title: title,
      limit: limit,
      offset: offset,
    };

    const albums = await albumService.getAllAlbums(queryParams);
    res.json(albums);
  } catch (error) {
    next(error);
  }
};

export const getTracksByAlbum = async (req, res, next) => {
  try {
    const albumId = req.params.albumId;
    const tracks = await trackService.getTracksByAlbum(albumId);
    res.json(tracks);
  } catch (error) {
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const album = await albumService.getAlbumById(req.params.id);
    res.json(album);
  } catch (error) {
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const albumData = {
      ...req.body,
      image: req.file ? req.file.buffer : null,
    };

    const album = await albumService.createAlbum(albumData);
    res.status(201).json(album);
  } catch (error) {
    next(error);
  }
};

export const updateAlbum = async (req, res, next) => {
  try {
    const album = await albumService.updateAlbum(req.params.id, req.body);
    if (album) {
      res.json(album);
    } else {
      res.status(404).send("Album not found");
    }
  } catch (error) {
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    await albumService.deleteAlbum(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const searchAlbums = async (req, res) => {
  try {
    const albums = await albumService.searchAlbums(req.query.q);
    res.json(albums);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const filterAlbumsByDate = async (req, res) => {
  try {
    const albums = await albumService.filterAlbumsByDate(req.query.date);
    res.json(albums);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createCompleteAlbum = async (req, res) => {
  try {
    const albumData = await albumService.createCompleteAlbum(req.body);
    res.status(201).json(albumData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
