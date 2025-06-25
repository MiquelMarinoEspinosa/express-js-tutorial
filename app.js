//Import package
const express = require("express");
const morgan = require("morgan");
const moviesRouter = require("./Routes/moviesRoutes");
const CustomError = require("./Utils/CustomError");
const globalErrorHandler = require("./Controllers/errorController");
const authRouter = require("./Routes/authRouter");

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
app.use("/api/v1/users", authRouter);
app.all("/{*any}", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Cant's find ${req.originalUrl} on the server!`,
  // });
  // const err = new Error(`Cant's find ${req.originalUrl} on the server!`);
  // err.status = "fail";
  // err.statusCode = 404;
  const err = new CustomError(
    `Cant's find ${req.originalUrl} on the server!`,
    404
  );

  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
