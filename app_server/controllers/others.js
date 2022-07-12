/*
module.exports.about = function (_req, res) {
    res.render('generic-text', {
        title: 'About',
        textContent: [
            'MEAN was created to help people find places to sit down and get a bit work done.',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ea eaque, ex fuga minus, natus nisi perferendis porro quasi quis sit sunt voluptatem voluptates. Hic ipsum quam sit soluta suscipit!'
        ]
    });
};
*/

module.exports.angularApp = function (_req, res) {
    res.render('layout', {
        'title': 'title for MEAN'
    });
};
