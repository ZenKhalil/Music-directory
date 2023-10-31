import Genre from "../models/genreModel.js";

// New function to fetch predefined genres
export const getPredefinedGenres = async (req, res, next) => {
  try {
    const genres = await Genre.findAll(); // Fetch all genres from the genres table
    res.json(genres);
  } catch (error) {
    next(error);
  }
};
