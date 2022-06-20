const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const theEarth = (function () {
    const earthRadius = 6371; //km
    let getDistanceFromRads = function (rads) {
        return parseFloat(rads * earthRadius);
    };
    let getRadsFromDistance = function (distance) {
        return parseFloat(distance / earthRadius);
    };

    return {
        getDistanceFromRads,
        getRadsFromDistance
    };
})();

const sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.locationsListByDistance = function (req, res) {
    let {lng, lat} = req.query;
    Loc.aggregate([{
        $geoNear: {
            near: {
                type: 'Point',
                coordinates: [parseFloat(lng), parseFloat(lat)]
            },
            distanceField: 'distance',
            spherical: true,
            maxDistance: 10000
        }
    }]).then(results => {
        let locations = [];
        results.forEach(doc => {
            locations.push({
                distance: theEarth.getDistanceFromRads(doc.distance),
                name: doc.name,
                address: doc.address,
                rating: doc.rating,
                facilities: doc.facilities,
                _id: doc._id
            });
        });
        sendJsonResponse(res, 200, locations);
    }).catch(err => sendJsonResponse(res, 404, err));
};

module.exports.locationsCreate = function (req, res) {
    Loc.create({
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities.split(','),
        coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
        openingTimes: [
            {
                days: req.body.days,
                opening: req.body.opening,
                closing: req.body.closing,
                closed: req.body.closed,
            }
        ]
    })
        .then(result => sendJsonResponse(res, 200, result))
        .catch(err => sendJsonResponse(res, 404, err));
};

module.exports.locationsReadOne = function (req, res) {
    if (req.params && req.params.locationid) {
        Loc
            .findById(req.params.locationid)
            .exec(function (err, location) {
                if (!location) {
                    sendJsonResponse(res, 404, {
                        'message': 'locationid not found'
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, location);
            });
    } else {
        sendJsonResponse(res, 404, {
            'message': 'No locationid in request'
        });
    }
};

module.exports.locationsUpdateOne = function (req, res) {
    if (!req.params.locationid) {
        sendJsonResponse(res, 404, {
            'message': 'Not found, locationid is required'
        });
        return;
    }
    Loc.findById(req.params.locationid)
        .select('-reviews -rating')
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
            location.name = req.body.name;
            location.address = req.body.address;
            location.facilities = req.body.facilities.split(',');
            location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
            location.openingTimes = [
                {
                    days: req.body.days,
                    opening: req.body.opening,
                    closing: req.body.closing,
                    closed: req.body.closed,
                }
            ];

            location.save((err, location) => {
                if (err) {
                    sendJsonResponse(res, 404, err);
                } else {
                    sendJsonResponse(res, 200, location);
                }
            });
        });
};

module.exports.locationsDeleteOne = function (req, res) {
    let locationid = req.params.locationid;

    if (locationid) {
        Loc.findById(locationid)
            .exec((err, location) => {
                if (err) {
                    sendJsonResponse(res, 404, err);
                } else {
                    sendJsonResponse(res, 204, null);
                }
            });
    } else {
        sendJsonResponse(res, 404, {
            'message': 'No locationid'
        });
    }
};
