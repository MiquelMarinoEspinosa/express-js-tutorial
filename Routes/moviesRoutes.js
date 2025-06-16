const express = require("express");
const moviesController = require("../Controllers/moviesController");

const router = express.Router();

router.route("/highest-rated").get(moviesController.highestRated);

router.route("/movie-stats").get(moviesController.getMovieStats);

router
  .route("/")
  .get(moviesController.getAllMovies)
  .post(moviesController.createMovie);

router
  .route("/:id")
  .get(moviesController.getMovie)
  .patch(moviesController.updateMovie)
  .delete(moviesController.deleteMovie);

module.exports = router;
