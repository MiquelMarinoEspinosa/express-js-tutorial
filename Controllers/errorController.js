const devErrors = (res, error, statusCode) => {
  res.status(statusCode).json({
    status: statusCode,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

const prodErrors = (res, error, statusCode) => {
  if (error.isOperational) {
    res.status(statusCode).json({
      status: statusCode,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong! Please try again later.",
    });
  }
};

module.exports = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    devErrors(res, error, statusCode);
  } else if (process.env.NODE_ENV === "production") {
    prodErrors(res, error, statusCode);
  }
};
