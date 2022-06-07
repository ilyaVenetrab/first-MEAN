module.exports.homeList = function (_req, res) {
    res.render('locations-list', { title: 'homeList' });
};

module.exports.locationInfo = function (_req, res) {
    res.render('location-info', { title: 'Location Info' });
};

module.exports.addReview = function (_req, res) {
    res.render('location-review-form', { title: 'Add Review' });
};
