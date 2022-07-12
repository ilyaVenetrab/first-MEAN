const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');

/* GET locations page. */
router.get('/', ctrlOthers.angularApp);
/*router.get('/location/:locationid', ctrlLocations.locationInfo);
router.get('/location/:locationid/review/new', ctrlLocations.addReview);
router.post('/location/:locationid/review/new', ctrlLocations.doAddReview);

/!* GET others page. *!/
router.get('/about', ctrlOthers.about);*/

module.exports = router;
