/** Importing NodeJS modules */
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

/** Started using Env variables using dotenv */
require('dotenv').config();

/** Middleware import */
const middlewares = require('./middlewares');

/** Restaurant routes file import */
const restaurants = require('./api/restaurant');

/**
 * @file server.js is the root file for this API
 * @author Diogo Costa
 * @see <a href="https://diogomarques.tk">Diogo Costa</a>
 */

/** Creates an Express Application */
const app = express();

/*
 * Connects to DB using mongoose
 * @see <a href="https://www.npmjs.com/package/mongoose">Mongoose npm</a>
 */
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
    origin: process.env.CORS_ORIGIN,
  }),
);

/**
 * This is a built-in middleware function in Express. It parses incoming
 * requests with JSON payloads and is based on body-parser
 */
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🚀',
  });
});

/**
 * When /api/restaurants the app fowards to routes file for restaurant
 * @see {@link restaurant}
 */
app.use('/api/restaurants', restaurants);

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
