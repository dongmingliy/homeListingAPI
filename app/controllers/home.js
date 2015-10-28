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
  if(minPrice == maxPrice){
    param.push({'properties.price':maxPrice});
  } else {
    if(minPrice){
      param.push({'properties.price': { $gte: minPrice}});
    }
    if(maxPrice){
      param.push({'properties.price': { $lte: maxPrice}});
    }
  }
  if(minBed == maxBed){
    param.push({'properties.bedrooms':maxBed});
  } else {
    if(minBed){
      param.push({'properties.bedrooms': { $gte: minBed}});
    }
    if(maxBed){
      param.push({'properties.bedrooms': { $lte: maxBed}});
    }
  }
  if(minBath == maxBath){
    param.push({'properties.bathrooms':maxBath});
  } else {
    if(minBath){
      param.push({'properties.bathrooms': { $gte: minBath}});
    }
    if(maxBath){
      param.push({'properties.bathrooms': { $lte: maxBath}});
    }
  }

  if(param.length > 0){
    param = { $and:param};
  }
  return param;
}