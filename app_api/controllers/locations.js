var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.locationsCreate = function (req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.locationsListByDistance = function (req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
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
  sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.locationsDeleteOne = function (req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};
