const Movie = require("./../Models/movieModel");
const ApiFeatures = require("../Utils/ApiFeatures");

exports.getAllMovies = async (req, res) => {
  try {
    const features = new ApiFeatures(Movie.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const movies = await features.query;

    res.status(200).json({
      status: "success",
      length: movies.length,
      data: {
        movies,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getMovie = async (req, res) => {
  try {
    //const movie = await Movie.find({__id: req.params.id});
    const movie = await Movie.findById(req.params.id);
    if (movie === null) {
      res.status(404).json({
        status: "fail",
        message: "Movie not found",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Movie not found: " + err.message,
    });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (movie === null) {
      res.status(404).json({
        status: "fail",
        message: "Movie not found",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.highestRated = async (req, res) => {
  try {
    const movies = await Movie.find().sort("-ratings").limit(5);

    res.status(200).json({
      status: "success",
      length: movies.length,
      data: {
        movies,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getMovieStats = async (req, res) => {
  try {
    const stats = await Movie.aggregate([
      { $match: { ratings: { $gte: 4.5 } } },
      {
        $group: {
          _id: "$releaseYear",
          avgRating: { $avg: "$ratings" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
          priceTotal: { $sum: "$price" },
          movieCount: { $sum: 1 },
        },
      },
      {
        $sort: {
          minPrice: 1,
        },
      },
      { $match: { maxPrice: { $gte: 60 } } },
    ]);

    res.status(200).json({
      status: "success",
      count: stats.length,
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
