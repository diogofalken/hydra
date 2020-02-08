/** Importing NodeJS modules */
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

/** Middleware import */
const middlewares = require('./middlewares');

/**
 * @file server.js is the root file for this API
 * @author Diogo Costa
 * @see <a href="https://diogomarques.tk">Diogo Costa</a>
 */

/** Creates an Express Application */
const app = express();

/**
 * HTTP request logger middleware for node.js
 * @see <a href="https://www.npmjs.com/package/morgan">Morgan npm</a>
 */
/** HTTP request logger middleware for nodejs */
app.use(morgan('common'));

/**
 * Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver
 * bullet but, it can help!
 * @see <a href="https://www.npmjs.com/package/helmet">Helmet npm</a>
 */
app.use(helmet());

/**
 * CORS is a node.js package for providing a Connect/Express middleware that can be used to
 * enable CORS with various options.
 * @see <a href="https://www.npmjs.com/package/cors">Cors npm</a>
 */
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

app.get('/', (req, res) => {
  res.json({
    message: '🚀',
  });
});

/**
 * Not Found is responsible for when a route is not found
 * @see {@link middlewares}
 */
app.use(middlewares.notFound);

/**
 * Error Handler is the last middleware to be invoked since it will take care of all
 * the errors and will be catched in this function
 * @see {@link middlewares}
 */
app.use(middlewares.errorHandler);

/**
 * Port that API will listen
 * @type {number|string}
 */
const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}...`);
});
