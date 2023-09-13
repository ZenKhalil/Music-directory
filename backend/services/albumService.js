import Album from '../models/albumModel.js';

export const getAllAlbums = async () => {
    return await Album.findAll();
};

export const getAlbumById = async (id) => {
    return await Album.findById(id);
};

export const createAlbum = async (data) => {
    return await Album.create(data);
};

export const updateAlbum = async (id, data) => {
    const album = await Album.findById(id);
    if (!album) return null;
    Object.assign(album, data);
    await album.save();
    return album;
};

export const deleteAlbum = async (id) => {
    const album = await Album.findById(id);
    if (!album) return null;
    await album.destroy();
    return album;
};
