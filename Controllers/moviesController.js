const Movie = require("./../Models/movieModel");

exports.getAllMovies = async (req, res) => {
  try {
    const excludeFields = ["sort", "page", "limit", "fields"];
    const queryObj = { ...req.query };

    excludeFields.forEach((el) => {
      delete queryObj[el];
    });

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const query = JSON.parse(queryStr);

    let queryMovies = Movie.find(query);

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queryMovies = queryMovies.sort(sortBy);
    } else {
      queryMovies = queryMovies.sort("-createdAt");
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      console.log(fields);
      queryMovies = queryMovies.select(fields);
    } else {
      queryMovies = queryMovies.select("-__v");
    }

    const movies = await queryMovies;

    // const query = Movie.find();

    // if (req.query.duration) {
    //   query.where("duration").gte(req.query.duration);
    // }

    // if (req.query.ratings) {
    //   query.where("ratings").gte(req.query.ratings);
    // }

    // if (req.query.price) {
    //   query.where("price").lte(req.query.price);
    // }

    // const movies = await query.exec();

    // const movies = await Movie.find()
    //   .where('duration')
    //   .gte(req.query.duration)
    //   .where('ratings')
    //   -gte(req.query.ratings)
    //   .where('price')
    //   .lte(req.query.price);

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
