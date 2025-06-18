//Import package
const express = require("express");
const morgan = require("morgan");
const moviesRouter = require("./Routes/moviesRoutes");

let app = express();

const logger = (req, res, next) => {
  console.log("Custom middleware called");
  next();
};

app.use(express.json());

app.set("query parser", "extended");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static("./public"));
app.use(logger);
app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

//USING ROUTES

app.use("/api/v1/movies", moviesRouter);
app.all("/{*any}", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Cant's find ${req.originalUrl} on the server!`,
  // });
  const err = new Error(`Cant's find ${req.originalUrl} on the server!`);
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || "error";
  res.status(statusCode).json({
    status: statusCode,
    message: error.message,
  });
});

module.exports = app;
