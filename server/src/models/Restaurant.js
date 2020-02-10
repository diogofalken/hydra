/**
 * Restaurant modules - As the Schema and the creation of the Model Restaurant
 * @module Restaurant
 */

/** Import Schema and Model from mongoose */
const mongoose = require('mongoose');

/**
 * Restaurant Schema
 * @typedef {Object} Restaurant
 * @property {String} title - Restaurant title
 * @property {String} description - Restaurant description
 * @property {String} image - Restaurant image
 * @property {Number} rating - Restaurant rating
 * @property {Date} visitDate - Visit Date to restaurant
 */

/**
 * Holds the Restaurant Schema
 * @type {mongoose.Schema}
 */
const RestaurantSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    image: String,
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    visitDate: {
      required: true,
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Restaurant Model
 */
const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;
