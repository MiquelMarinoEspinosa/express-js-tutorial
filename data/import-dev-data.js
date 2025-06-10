const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Movie = require("../Models/movieModel");

dotenv.config({ path: "./config.env" });

//CONNECT TO MONGODB
mongoose
  .connect(process.env.CONN_STR)
  .then((conn) => {
    console.log("DB Connections Successful");

    if (process.argv[2] === "--import") {
      importMovies();
    }

    if (process.argv[2] === "--delete") {
      deleteMovies();
    }
  })
  .catch((error) => {
    console.log("Some error has occurred");
  });

const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

const deleteMovies = async () => {
  try {
    await Movie.deleteMany();
    console.log("Data sucessfully deleted!");
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};

const importMovies = async () => {
  try {
    await Movie.create(movies);
    console.log("Successfuly imported!");
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};
