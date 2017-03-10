angular.module('loc8rApp', []);

var _isNumeric = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function () {
  return function (distance) {
    var numDistance, unit;
      if (distance && _isNumeric(distance)) {
        if (distance > 1) {
          numDistance = parseFloat(distance).toFixed(1);
		unit = 'km';
        } else {
          numDistance = parseInt(distance * 1000,10);
		unit = 'm';
	   }
	   return numDistance + unit;
	   } else {
	   return "?";
        }
     };
};

var locationListCtrl = function ($scope) {
  $scope.data = {
    locations: [{
      name: 'Burger Queen',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 3,
      facilities: ['Hot drinks', 'Food', 'Premium Wifi', 'Free Wasps'],
      distance: '0.296456',
      _id: '5370a35f2536f6785f8dfb6a'
     },{
       name: 'Costy',
       address: '125 High Street, Reading, RG6 1PS',
       rating: 5,
       facilities: ['Hot Drinks', 'Premium Wifi', 'Disgruntled Employees'],
       distance: '0.7865456',
       _id: '5370a35f2536f678f8dfb6a'
   }]};
};

angular
  .module('loc8rApp')
  .controller('locationListCtrl', locationListCtrl)
  .filter('formatDistance', formatDistance);
