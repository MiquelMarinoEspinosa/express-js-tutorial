module.exports = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || "error";
  res.status(statusCode).json({
    status: statusCode,
    message: error.message,
  });
};
