/* GET 'home' page */
module.exports.homelist = function(req, res) {
     res.render('locations-list', {
          title: 'Loc8r - find a place to work with wifi',
          pageHeader: {
               title: 'Loc8r',
               strapline: 'Find places to work with wifi near you!'
          },
          sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake, or a pint? Let Loc8r help you find the place you're looking for.",
          locations: [{
               name: 'Oppenheimer Cafe',
               address: '1500 N. Warner St. Tacoma, WA 98416',
               rating: 3,
               facilities: ['Hot drinks', 'Food', 'Premium wifi'],
               distance: '100m'
          },{
               name: 'Diversions',
               address: 'Wheelock Student Center, Warner St. Tacoma, Wa 98416',
               rating: 4,
               facilities: ['Hot drinks', 'Food', 'Premium wifi'],
               distance: '130m'
          }]
     });
};

/* GET 'Location info' page */
module.exports.locationInfo = function(req, res) {
     res.render('location-info', {
        title: 'Oppenheimer Cafe',
        pageHeader: {title: 'Oppenheimer Cafe'
        },
        sidebar: {
            context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location: {
            name: 'Oppenheimer Cafe',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            coords: {
                lat: 47.2635,
                lng: -122.4832
            },
            openingTimes: [{
                days: 'Monday - Thursday',
                opening: '7:00am',
                closing: '6:00pm',
                closed: false
            }, {
            	days: 'Friday',
            	opening: '7:00am',
            	closing: '5:00pm',
            	closed: false
            }, {
                days: 'Saturday & Sunday',
                closed: true
            }],
            reviews: [{
                author: 'Simon Holmes',
                rating: 5,
                timestamp: '16 July 2013',
                reviewText: 'What a great place. I can\'t say enough good things about it.'
            }, {
                author: 'Charlie Chaplin',
                rating: 3,
                timestamp: '16 June 2013',
                reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
            }]
        }
});
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res) {
     res.render('location-review-form', {
          title: 'Review Oppenheimer on Loc8r.',
          pageHeader: { title: 'Review Oppenheimer'}
     });
};
