const Movie = require("./../Models/movieModel");

exports.getAllMovies = (req, res) => {};

exports.getMovie = (req, res) => {};

exports.createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.updateMovie = (req, res) => {};

exports.deleteMovie = (req, res) => {};
