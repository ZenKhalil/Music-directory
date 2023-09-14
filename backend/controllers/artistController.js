import * as artistService from '../services/artistService.js';
import { validationResult } from 'express-validator';

export const getAllArtists = async (req, res, next) => {
    try {
        const artists = await artistService.getAllArtists();
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
