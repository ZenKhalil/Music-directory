import express from "express";
import * as artistController from "../controllers/artistController.js";
import { body } from "express-validator";
import multer from "multer";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/search", artistController.searchArtists);
router.get("/", artistController.getAllArtists);
router.get("/:id", artistController.getArtistById);

// Endpoint to get artist image
router.get("/:id/image", artistController.getArtistImage);
router.get("/:artistId/albums", artistController.getAlbumsByArtist);

const validGenres = [
  "R&B",
  "Electropop",
  "Indie",
  "Funk",
  "K-Pop",
  "Latin",
  "Pop",
  "Rap",
  "Disco",
  "Folk",
  "Alternative",
  "Rock",
  "Contemporary R&B",
  "Soul",
  "Dance",
  "Hip-Hop",
  "Soft Rock",
  "Country",
];

router.post(
  "/",
  upload.single("image"),
  (req, res, next) => {
    if (typeof req.body.genres === "string") {
      req.body.genres = req.body.genres.split(", ").map((genre) => genre.trim());
    }
    next();
  },
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ max: 255 })
      .withMessage("Name should not exceed 255 characters"),
    body("biography")
      .optional()
      .isLength({ max: 1000 })
      .withMessage("Biography should not exceed 1000 characters"),
    body("genres").isArray().withMessage("Genres should be an array"),
    body("genres.*").isIn(validGenres).withMessage("Invalid genre selected"),
  ],
  artistController.createArtist
);


router.put(
  "/:id",
  upload.single("image"), // assuming the image field in the form is named 'image'
  artistController.updateArtist
);

router.delete("/:id", artistController.deleteArtist);

export default router;
