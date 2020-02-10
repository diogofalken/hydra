const { Router } = require('express');

const Restaurant = require('../models/Restaurant');

const routes = Router();

routes.get('/', async (req, res) => {
  const restaurants = await Restaurant.find();

  return res.json(restaurants);
});

routes.post('/', async (req, res) => {
  const checkIfExists = await Restaurant.findOne({
    title: req.body.title,
  });

  if (checkIfExists !== null) {
    return res.json({ message: 'This entry already exists' }).status(500);
  }

  const restaurant = await Restaurant.create(req.body);

  return res.json(restaurant);
});

module.exports = routes;
