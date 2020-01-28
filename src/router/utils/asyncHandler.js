/**
 * Α function that takes another function and wraps it in a promise.
 * Used to propagate errors through next to the error handlers.
 */

function asyncHandler(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res);
      return;
    } catch (err) {
      next(err);
    }
  };
}

module.exports = {
  asyncHandler,
};
