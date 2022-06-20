const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

const setAverageRating = function (location) {
    let reviewCount;
    let ratingAverage;
    let ratingTotal;

    if (location.reviews && location.reviews.length > 0) {
        reviewCount = location.reviews.length;
        ratingTotal = 0;
        for (let i = 0; i < reviewCount; i++) {
            ratingTotal += location.reviews[i].rating;
        }
        ratingAverage = parseInt(ratingTotal / reviewCount, 10);
        location.rating = ratingAverage;
        location.save(err => {
            if (err) {
                console.log(err);
            } else {
                console.log('Average rating updated to ', ratingAverage);
            }
        });
    }
};

const updateAverageRating = function (locationid) {
    Loc.findById(locationid)
        .select('rating reviews')
        .exec((err, location) => {
            if (!err) {
                setAverageRating(location);
            }
        });
};

const addReview = function (req, res, location) {
    if (!location) {
        sendJsonResponse(res, 404, {
            'message': 'locationid not found'
        });
    } else {
        location.reviews.push({
            author: req.body.author,
            rating: req.body.rating,
            reviewText: req.body.reviewText
        });
        location.save((err, location) => {
            let thisReview;
            if (err) {
                sendJsonResponse(res, 404, err);
            } else {
                updateAverageRating(location._id);
                thisReview = location.reviews[location.reviews.length - 1];
                sendJsonResponse(res, 201, thisReview);
            }
        });
    }
};

module.exports.reviewsCreate = function (req, res) {
    let locationid = req.params.locationid;

    if (locationid) {
        Loc.findById(locationid)
            .select('reviews')
            .exec((err, location) => {
                if (err) {
                    sendJsonResponse(res, 404, err);
                } else {
                    addReview(req, res, location);
                }
            });
    } else {
        sendJsonResponse(res, 404, {
            'message': 'Not found, locationid required'
        });
    }

};

module.exports.reviewsReadOne = function (req, res) {
    if (req.params && req.params.locationid && req.params.reviewid) {
        Loc
            .findById(req.params.locationid)
            .select('name reviews')
            .exec(function (err, location) {
                let review;
                let response;

                if (!location) {
                    sendJsonResponse(res, 404, {
                        'message': 'locationid not found'
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }

                if (location.reviews && location.reviews.length > 0) {
                    review = location.reviews.id(req.params.reviewid);
                    if (!review) {
                        sendJsonResponse(res, 404, {
                            'message': 'reviewid not found'
                        });
                    } else {
                        response = {
                            location: {
                                name: location.name,
                                id: req.params.locationid
                            },
                            review
                        };

                        sendJsonResponse(res, 200, response);
                    }
                } else {
                    sendJsonResponse(res, 404, {
                        'message': 'No reviews found'
                    });
                }
            });
    } else {
        sendJsonResponse(res, 404, {
            'message': 'Not found, locationid and reviewid are both required'
        });
    }
};

module.exports.reviewsUpdateOne = function (req, res) {
    if (!req.params.locationid || !req.params.reviewid) {
        sendJsonResponse(res, 404, {
            'message': 'Not found, locationid and reviewis are both required'
        });
        return;
    }
    Loc.findById(req.params.locationid)
        .select('reviews')
        .exec((err, location) => {
            let review;
            if (!location) {
                sendJsonResponse(res, 404, {
                    'message': 'locationid not found'
                });
                return;
            } else if (err) {
                sendJsonResponse(res, 400, err);
                return;
            }

            if (location.reviews && location.reviews.length > 0) {
                review = location.reviews.id(req.params.reviewid);
                if (!review) {
                    sendJsonResponse(res, 404, {
                        'message': 'reviewid not found'
                    });
                } else {
                    review.author = req.body.author;
                    review.rating = req.body.rating;
                    review.reviewText = req.body.reviewText;
                    location.save((err, location) => {
                        if (err) {
                            sendJsonResponse(res, 404, err);
                        } else {
                            updateAverageRating(location._id);
                            sendJsonResponse(res, 200, location);
                        }
                    });
                }
            } else {
                sendJsonResponse(res, 404, {
                    'message': 'No review to update'
                });
            }
        });
};

module.exports.reviewsDeleteOne = function (req, res) {
    if (!req.params.locationid || !req.params.reviewid) {
        sendJsonResponse(res, 404, {
            'message': 'Not found, locationid and reviewis are both required'
        });
        return;
    }
    Loc.findById(req.params.locationid)
        .select('reviews')
        .exec((err, location) => {
            if (!location) {
                sendJsonResponse(res, 404, {
                    'message': 'locationid not found'
                });
                return;
            } else if (err) {
                sendJsonResponse(res, 400, err);
                return;
            }

            if (location.reviews && location.reviews.length > 0) {
                if (!location.reviews.id(req.params.reviewid)) {
                    sendJsonResponse(res, 404, {
                        'message': 'reviewid not found'
                    });
                } else {
                    location.reviews.id(req.params.reviewid).remove();
                    location.save((err, location) => {
                        if (err) {
                            sendJsonResponse(res, 404, err);
                        } else {
                            updateAverageRating(location._id);
                            sendJsonResponse(res, 204, null);
                        }
                    });
                }
            } else {
                sendJsonResponse(res, 404, {
                    'message': 'No review to delete'
                });
            }
        });
};
