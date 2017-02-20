var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.locationsCreate = function (req, res) {
  Loc.create({
    name: req.body.name,
    address: req.body.address,
    facilities: req.body.facilities.split(","),
    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    openingTimes: [{
      days: req.body.days1,
      opening: req.body.opening1,
      closing: req.body.closing1,
      closed: req.body.closed1,
    }, {
      days: req.body.days2,
      opening: req.body.opening2,
      closing: req.body.closing2,
      closed: req.body.closing2,
    }]
  }, function(err, location) {
    if (err) {
      sendJsonResponse(res, 400, err);
} else {
  sendJsonResponse(res, 201, location);
  }
 });
};

module.exports.locationsListByDistance = function (req, res) {
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);
  var point = {
    type: "Point",
    coordinates: [lng, lat]
  };
  var geoOptions = {
    spherical: true,
    maxDistance: 20000,
    num: 10
  };
  if (!lng || !lat) {
    sendJsonResponse(res, 404, {"message": "lng and lat query parameters are required"});
    return;
  }
  Loc.geoNear(point, geoOptions, function(err, results, stats) {
    var locations = [];
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      results.forEach(function(doc) {
        locations.push({
          distance: doc.dis,
          name: doc.obj.name,
          address: doc.obj.address,
          rating: doc.obj.rating,
          facilities: doc.obj.facilities,
          _id: doc.obj._id
        });
      });
      sendJsonResponse(res, 200, locations);
     }
   });
};

module.exports.locationsReadOne = function (req, res) {
  if (req.params && req.params.locationid)  { // checks if locationid exists
    Loc
      .findById(req.params.locationid)
      .exec(function(err, location) {
        if (!location) { // if mongoose does
          sendJsonResponse(res, 404, {"message" : "locationid not found"});
          console.log("locationid not found");
          return;
        } else if (err) {  // if mongoose returns an error
          sendJsonResponse(res, 404, err);
          console.log("mongoose returned an error");
          return;
        }
        sendJsonResponse(res, 200, location); // no error
        console.log("locationsReadOne successful");
      });
  } else {
    console.log("No lacationid in request");
    sendJsonResponse(res, 404, {"message" : "No lacationid in request"});
  }
};

module.exports.locationsUpdateOne = function (req, res) {
  if (!req.params.locationid) {
    sendJsonResponse(res, 404, {"message" : "Not found, locationid is required"});
    return;
 }
 Loc
   .findById(req.params.locationid)
   .select('-reviews -rating')
   .exec(
      function(err, location) {
       if (!location) {
         sendJsonResponse(res, 404, {"message" : "locationid not found"});
         return;
    } else if (err) {
      sendJsonResponse(res, 400, err);
      return;
    }
    location.name = req.body.name;
    location.address = req.body.address;
    location.facilities = req.body.facilities.split(",");
    location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    location.openingTimes = [{
      days: req.body.days1,
      opening: req.body.opening1,
      closing: req.body.closing1,
      closed: req.body.closed1,
    }, {
      days: req.body.days2,
      opening: req.body.opening2,
      closing: req.body.closing2,
      closed: req.body.closed2,
    }];
    location.save(function(err, location) {
      if (err) {
        sendJsonResponse(res, 404, err);
      } else {
        sendJsonResponse(res, 200, location);
      }
    });
   }
  );
};

module.exports.locationsDeleteOne = function (req, res) {
  var locationid = req.params.locationid;
    if (locationid) {
     Loc
       .findByIdAndRemove(locationid)
       .exec(
         function(err, location) {
           if (err) {
             sendJsonResponse(res, 404, err);
             return;
           };
           sendJsonResponse(res, 204, null);
         }
       );
    } else {
      sendJsonResponse(res, 404, {"message": "No locationid"});
   }
};
