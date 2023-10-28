<<<<<<< Updated upstream
import express from 'express';
import * as albumController from '../controllers/albumController.js';
import { authenticate } from './middleware/authMiddleware.js';
=======
import express from "express";
import * as albumController from "../controllers/albumController.js";
import { body } from "express-validator";
import multer from "multer";
>>>>>>> Stashed changes

const router = express.Router();

router.post('/albums', authenticate, albumController.createAlbum);

<<<<<<< Updated upstream
router.get('/search', albumController.searchAlbums);
router.get('/filterByDate', albumController.filterAlbumsByDate);
=======
>>>>>>> Stashed changes

router.post('/complete', albumController.createCompleteAlbum);

<<<<<<< Updated upstream
router.get('/', albumController.getAllAlbums);

// Nested route to get tracks of a specific album
router.get('/:albumId/tracks', albumController.getTracksByAlbum);

router.get('/:id', albumController.getAlbumById);
router.post('/', albumController.createAlbum);
router.put('/:id', albumController.updateAlbum);
router.delete('/:id', albumController.deleteAlbum);
=======

// Route to create an album with authentication
router.post(
  "/",
  upload.single("image"),
  [
    body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 255 })
    .withMessage("Title should not exceed 255 characters"),
    // Add any other validation for album fields here, similar to what you did for artists
  ],
  albumController.createAlbum
  );
  
  // Route to upload an album image
  router.put(
    "//:id",
    upload.single("image"),
    albumController.updateAlbum
  );

  router.delete("/:id", albumController.deleteAlbum);
  
// Other routes
router.get("/search", albumController.searchAlbums);
router.get("/filterByDate", albumController.filterAlbumsByDate);
router.post("/complete", albumController.createCompleteAlbum);
router.get("/", albumController.getAllAlbums);
router.get("/:albumId/tracks", albumController.getTracksByAlbum);
router.get("/:id", albumController.getAlbumById);
router.put("/:id", upload.single("image"), albumController.updateAlbum); // For updating album with an image
router.delete("/:id", albumController.deleteAlbum);
>>>>>>> Stashed changes

export default router;