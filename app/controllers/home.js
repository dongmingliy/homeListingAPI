var express = require('express'),
  router = express.Router(),
  //user = require('./routes/user'),
  mongoose = require('mongoose'),
  listing = mongoose.model('listing');
  GeoJSON = require('geojson');
  module.exports = function (app) {
    app.use('/', router);
  };

router.get('/listings', function (req, res) {
  var searchParam = getSearchParam(req);
  listing.find(searchParam,'-_id', function(err, data){
    var geoformat = {'type': 'FeatureCollection', 'features': data};
    res.json(geoformat);
  });

});

var getSearchParam = function(req) {
  var minPrice = req.query.min_price;
  var maxPrice = req.query.max_price;
  var minBed = req.query.min_bed;
  var maxBed = req.query.max_bed;
  var minBath = req.query.min_bath;
  var maxBath = req.query.max_bath;

  var param = [];
  if(minPrice){
    param.push({'properties.price': { $gt: minPrice}});
  }
  if(maxPrice){
    param.push({'properties.price': { $lt: maxPrice}});
  }
  if(minBed){
    param.push({'properties.bedrooms': { $gt: minBed}});
  }
  if(maxBed){
    param.push({'properties.bedrooms': { $lt: maxBed}});
  }
  if(minBath){
    param.push({'properties.bathrooms': { $gt: minBath}});
  }
  if(maxBath){
    param.push({'properties.bathrooms': { $lt: maxBath}});
  }
  return param;
}