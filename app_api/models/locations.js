const mongoose = require('mongoose');

const openingTimeScheme = new mongoose.Schema({
    days: {
        type: String,
        required: true,
    },
    opening: String,
    closing: String,
    closed: {
        type: Boolean,
        required: true
    }
});

const reviewsScheme = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

const locationScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    facilities: [String],
    coords: {
        type: [Number],
        index: '2dsphere'
    },
    openingTimes: [openingTimeScheme],
    reviews: [reviewsScheme]
});

mongoose.model('Location', locationScheme);
