/**
 * Middlewares modules - Has all the custom middlewares that will be used by Express
 * @module middlewares
 */

/**
 * Method responsible when a route was not found
 * @param {Express.Request} req - Incoming information about Request
 * @param {Express.Response} res - Incoming information about Response
 * @param {Function} next - Function that when called passes to next Middleware
 * @returns {void}
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Method responsible when a route was not found
 * @param {string} error - Error, passed by notFound function
 * @param {Express.Request} req - Incoming information about Request
 * @param {Express.Response} res - Incoming information about Response
 * @param {Function} next - Function that when called passes to next Middleware
 * @returns {Object} - Returns a response with the error message and the error stack if we are
 * in the development mode
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: error.stack === 'production' ? '🍑' : error.stack,
  });
};

module.exports = { notFound, errorHandler };
