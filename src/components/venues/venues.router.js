const Router = require('express');
const router = new Router();

const VenuesController = require('./venues.controller');

router.get('/venues', VenuesController.getVenues);

module.exports = router;