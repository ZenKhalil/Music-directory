import Album from '../models/albumModel.js';
import Artist from '../models/artistModel.js';
import Track from '../models/trackModel.js';
import { Op } from 'sequelize';

<<<<<<< Updated upstream

export const getAllAlbums = async (whereClause = {}, sort = 'title', order = 'ASC', limit = null, offset = 0) => {
    limit = isNaN(limit) ? null : limit; // Adjusted this line
    offset = isNaN(offset) ? 0 : offset;

    const queryOptions = {
        where: whereClause,
        order: [[sort, order]],
        offset: offset
    };

    if (limit !== null) {
        queryOptions.limit = limit;
    }

    return await Album.findAll(queryOptions);
};

export const getAlbumsByArtist = async (artistId) => {
    return await Album.findAll({
        where: { artist_id: artistId }
    });
};

export const getAlbumById = async (id) => {
    return await Album.findByPk(id, {
        include: Artist
    });
};


export const createAlbum = async (data) => {
    return await Album.create(data);
};

export const updateAlbum = async (id, data) => {
    const album = await Album.findByPk(id);
    if (!album) return null;
    Object.assign(album, data);
    await album.save();
    return album;
};

export const deleteAlbum = async (id) => {
    const album = await Album.findByPk(id);
    if (!album) return null;
    await album.destroy();
    return album;
};

export const searchAlbums = async (query) => {
    return await Album.findAll({
        where: {
            title: {
                [Op.like]: `%${query}%`
            }
        }
    });
};

export const filterAlbumsByDate = async (date) => {
    return await Album.findAll({
        where: {
            release_date: {
                [Op.gte]: date
            }
        }
    });
};

export const createCompleteAlbum = async (data) => {
    const { artist, tracks, ...albumDetails } = data;

    // Check if artist exists or create a new one
    let [artistInstance, created] = await Artist.findOrCreate({
        where: { name: artist.name },
        defaults: artist
=======
const getAllAlbums = async (queryParams) => {
  const page = parseInt(queryParams.page, 10) || 1;
  const limit = parseInt(queryParams.limit, 100) || 100;
  const offset = (page - 1) * limit;

  const sort = queryParams.sort || "title";
  const order = queryParams.order || "ASC";

  return await Album.findAll({
    attributes: ["id", "title", "release_date", "artist_id", "image"],
    order: [[sort, order]],
    limit: limit,
    offset: offset,
  });
};

const getAlbumsByArtist = async (artistId) => {
  return await Album.findAll({
    where: { artist_id: artistId },
    attributes: ["id", "title", "release_date", "image"],
  });
};

const getAlbumById = async (id) => {
  return await Album.findByPk(id, {
    attributes: ["id", "title", "release_date", "artist_id", "image"],
    include: {
      model: Artist,
      attributes: ["id", "name", "biography", "genres", "image"],
    },
  });
};

const createAlbum = async (data) => {
  return await Album.create(data, {
    attributes: ["id", "title", "release_date", "artist_id", "image"],
  });
};

const updateAlbum = async (id, data) => {
  const album = await Album.findByPk(id, {
    attributes: ["id", "title", "release_date", "artist_id", "image"],
  });
  if (!album) return null;
  Object.assign(album, data);
  await album.save();
  return album;
};

const deleteAlbum = async (id) => {
  const album = await Album.findByPk(id, {
    attributes: ["id", "title", "release_date", "artist_id", "image"],
  });
  if (!album) return null;
  await album.destroy();
  return album;
};

const searchAlbums = async (query) => {
  return await Album.findAll({
    where: {
      title: {
        [Op.like]: `%${query}%`,
      },
    },
    attributes: ["id", "title", "release_date", "artist_id", "image"],
  });
};

const filterAlbumsByDate = async (date) => {
  return await Album.findAll({
    where: {
      release_date: {
        [Op.gte]: date,
      },
    },
    attributes: ["id", "title", "release_date", "artist_id", "image"],
  });
};

const createCompleteAlbum = async (data) => {
  const { artist, tracks, ...albumDetails } = data;

  // Check if artist exists or create a new one
  let [artistInstance] = await Artist.findOrCreate({
    where: { name: artist.name },
    defaults: artist,
  });

  // Create the album
  const album = await Album.create({
    ...albumDetails,
    artistId: artistInstance.id,
  });

  // Check each track and associate with the album
  for (let track of tracks) {
    let [trackInstance] = await Track.findOrCreate({
      where: { name: track.name },
      defaults: track,
>>>>>>> Stashed changes
    });

<<<<<<< Updated upstream
    // Create the album
    const album = await Album.create({ ...albumDetails, artistId: artistInstance.id });

    // Check each track and associate with the album
    for (let track of tracks) {
        let [trackInstance] = await Track.findOrCreate({
            where: { name: track.name },
            defaults: track
        });
        await album.addTrack(trackInstance);
    }

    return album;
=======
  return album;
};

// Function to upload an album image
const uploadAlbumImage = async (id, imageData) => {
  const album = await Album.findByPk(id);
  if (!album) return null;

  album.image = imageData;
  await album.save();

  return album;
};

// Function to retrieve an album image
const getAlbumImage = async (id) => {
  const album = await Album.findByPk(id);
  if (!album) return null;

  return album.image;
};

const createAlbumWithImage = async (albumData, imageFile) => {
  try {
    const album = await createAlbum(albumData);

    if (imageFile && imageFile.buffer) {
      await uploadAlbumImage(album.id, imageFile.buffer);
    }

    return album;
  } catch (error) {
    console.error("Error in createAlbumWithImage:", error);
    return null;
  }
>>>>>>> Stashed changes
};

export {
  getAllAlbums,
  getAlbumsByArtist,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  searchAlbums,
  filterAlbumsByDate,
  createCompleteAlbum,
  uploadAlbumImage,
  getAlbumImage,
  createAlbumWithImage,
};