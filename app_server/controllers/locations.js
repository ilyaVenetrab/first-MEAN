module.exports.homeList = function (_req, res) {
    res.render('locations-list', {
        title: 'MEAN Find places to work with wifi',
        pageHeader: {
            title: 'MEAN',
            subTitle: 'Find places to work with wifi near you!'
        },
        sidebar: 'Looking for wifi and a seat? MEAN helps you find places to work when out and about. Perhaps with coffee, cake or a print? Let MEAN help you find the place you\'re looking for.',
        locations: [
            {
                name: 'Starcups',
                address: '125 High Street, Reading, RG6 1PS',
                rating: 3,
                facilities: [
                    'Hot drinks',
                    'Food',
                    'Premium wifi'
                ],
                distance: '100m'
            },
            {
                name: 'Cafe Hero',
                address: '125 High Street, Reading, RG6 1PS',
                rating: 2,
                facilities: [
                    'Hot drinks',
                    'Food',
                    'Premium wifi'
                ],
                distance: '1000m'
            },
            {
                name: 'Burger Queen',
                address: '125 High Street, Reading, RG6 1PS',
                rating: 5,
                facilities: [
                    'Hot drinks',
                    'Food',
                    'Premium wifi'
                ],
                distance: '450m'
            }
        ]
    });
};

module.exports.locationInfo = function (_req, res) {
    res.render('location-info', {
        img: 'https://picsum.photos/seed/picsum/200/300',
        name: 'Starcups',
        address: '125 High Street, Reading, RG6 1PS',
        rating: 3,
        facilities: [
            'Hot drinks',
            'Food',
            'Premium wifi'
        ],
        distance: [-0.9690884, 51.455041],
        reviews: [
            {
                rating: 5,
                createdOn: '16 July 2021',
                reviewText: 'What a great place. I can\'t say enough good things about it.',
                author: 'Ilya Bartenev'
            },
            {
                rating: 3,
                createdOn: '18 July 2021',
                reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast',
                author: 'Ilya Bartenev'
            }
        ],
        openingTimes: [
            {
                days: 'Monday - Friday',
                opening: '7:00am',
                closing: '7:00pm',
                closed: false
            },
            {
                days: 'Saturday',
                opening: '8:00am',
                closing: '5:00pm',
                closed: false
            },
            {
                days: 'Sunday',
                closed: true
            }
        ],
        placeContents: [
            'Simon\'s cafe is on MEAN because it has accessible wifi ans space to sut down with you r laptop and get some work done.',
            'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        ]
    });
};

module.exports.addReview = function (_req, res) {
    res.render('location-review-form', { title: 'Starcups' });
};
