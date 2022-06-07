const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');

/* GET locations page. */
router.get('/', ctrlLocations.homeList);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

/* GET others page. */
router.get('/about', ctrlOthers.about);

module.exports = router;
