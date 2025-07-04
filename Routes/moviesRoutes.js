const express = require("express");
const moviesController = require("../Controllers/moviesController");
const authController = require("../Controllers/authController");

const router = express.Router();

router.route("/highest-rated").get(moviesController.highestRated);

router.route("/movie-stats").get(moviesController.getMovieStats);

router.route("/movies-by-genre/:genre").get(moviesController.getMovieByGenre);

router
  .route("/")
  .get(authController.protect, moviesController.getAllMovies)
  .post(moviesController.createMovie);

router
  .route("/:id")
  .get(authController.protect, moviesController.getMovie)
  .patch(moviesController.updateMovie)
  .delete(moviesController.deleteMovie);

module.exports = router;
