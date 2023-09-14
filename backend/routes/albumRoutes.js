import express from 'express';
import * as albumController from '../controllers/albumController.js';

const router = express.Router();

router.get('/search', albumController.searchAlbums);
router.post('/complete', albumController.createCompleteAlbum);

router.get('/', albumController.getAllAlbums);
router.get('/:id', albumController.getAlbumById);

// Nested route to get tracks of a specific album
router.get('/:albumId/tracks', albumController.getTracksByAlbum);

router.post('/', albumController.createAlbum);
router.put('/:id', albumController.updateAlbum);
router.delete('/:id', albumController.deleteAlbum);

export default router;
