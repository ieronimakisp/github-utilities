// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  //TODO: Replace with a serious logger
  console.log(
    `${status} - ${err.message} - ${req.method} ${req.originalUrl} - ${req.ip}`,
  );

  res.status(status);
  res.json({
    error: err.message,
    status,
  });
}

module.exports = errorHandler;
