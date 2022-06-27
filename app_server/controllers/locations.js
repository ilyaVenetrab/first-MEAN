const request = require('request');
const { response } = require('express');
let apiOptions = {
    server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://safe-journey-56345.herokuapp.com';
}

const _formatDistance = (distance) => {
    let numDistance; let unit;
    if (distance > 1) {
        numDistance = parseFloat(distance).toFixed(1);
        unit = 'km';
    } else {
        numDistance = parseInt(String(distance * 1000), 10);
        unit = 'm';
    }

    return numDistance + unit;
};

const _showError = (_req, res, errorCode) => {
    let title;
    let textContent = [];
    if (errorCode === 404) {
        title = '404, page not found';
        textContent.push('On dear. Look like we can\'t find this page. Sorry.');
    } else {
        title = `${errorCode }, something's gone wrong`;
        textContent.push('Something, somewhere, has gone just a little bit wrong.');
    }
    res.status(errorCode);
    res.render('generic-text', {
        title,
        textContent
    });
};

const renderHomepage = (_req, res, responseBody) => {
    let message = '';
    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    } else if (!responseBody.length) {
        message = 'No place found nearby';
    }

    res.render('locations-list', {
        title: 'MEAN Find places to work with wifi',
        pageHeader: {
            title: 'MEAN',
            subTitle: 'Find places to work with wifi near you!'
        },
        sidebar: 'Looking for wifi and a seat? MEAN helps you find places to work when out and about. Perhaps with coffee, cake or a print? Let MEAN help you find the place you\'re looking for.',
        locations: responseBody,
        message
    });
};

const renderDetailPage = function (_req, res, locDetail) {
    res.render('location-info', {
        location: locDetail,
        placeContents: [
            'Simon\'s cafe is on MEAN because it has accessible wifi ans space to sut down with you r laptop and get some work done.',
            'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        ]
    });
};

const renderReviewForm = function (req, res, locDetail) {
    res.render('location-review-form', {
        title: `Review ${locDetail.name} on MEAN`,
        pageHeader: {
            title: `Review ${locDetail}`
        },
        error: req.query.err
    });
};

const getLocationInfo = function (req, res, callback) {
    const path = `/api/locations/${req.params.locationid}`;
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };
    request(requestOptions, function (err, resp, body) {
        const data = body;
        if (resp.statusCode === 200) {
            data.coords = [body.coords[0], body.coords[1]];
            callback(req, res, data);
        } else {
            _showError(req, res, resp.statusCode);
        }
    });
};

module.exports.homeList = function (req, res) {
    const path = '/api/locations';
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {},
        qs: {
            lng: -0.9630880,
            lat: 51.451040,
            maxDistance: 20
        }
    };

    request(requestOptions, function (err, resp, body) {
        const data = body;
        if (resp.statusCode === 200 && data.length) {
            data.forEach(i => {
                i.distance = _formatDistance(i.distance);
            });
        }
        renderHomepage(req, res, data);
    });
};

module.exports.locationInfo = function (req, res) {
    getLocationInfo(req, res, function (req, res, responseData) {
        renderDetailPage(req, res, responseData);
    });
};

module.exports.addReview = function (req, res) {
    getLocationInfo(req, res, function (req, res, responseData) {
        renderReviewForm(req, res, responseData);
    });
};

module.exports.doAddReview = function(req, res) {
    const locationid = req.params.locationid;
    const path = `/api/locations/${locationid}/reviews`;
    const postData = {
        author: req.body.name,
        rating: parseInt(req.body.rating, 10),
        reviewText: req.body.review
    };
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'POST',
        json: postData
    };

    if (!postData.author || !postData.rating || postData.reviewText) {
        res.redirect(`/location/${locationid}/review/new?err=val`);
    } else {
        request(requestOptions, function(_err, resp, body) {
            if (resp.statusCode === 201) {
                res.redirect(`/location/${locationid}`);
            } else if (resp.statusCode === 404 && body.name && body.name === 'ValidationError') {
                res.redirect(`/location/${locationid}/review/new?err=val`);
            } else {
                _showError(req, res, resp.statusCode);
            }
        });
    }
};
