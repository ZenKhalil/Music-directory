import * as albumService from '../services/albumService.js';

export const getAllAlbums = async (req, res, next) => {
    try {
        const albums = await albumService.getAllAlbums();
        res.json(albums);
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
        const album = await albumService.createAlbum(req.body);
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
            res.status(404).send('Album not found');
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
