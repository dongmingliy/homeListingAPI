// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var homeSchema = Schema({
  type: String,
  properties:{
    id:Number,
    street:String,
    status:String,
    price:{ type: Number, index: true },
    bedrooms:{ type: Number, index: true },
    bathrooms:{ type: Number, index: true },
    sq_ft:Number
  },
  geometry: {
    coordinates: { type: [Number], index: '2dsphere'}
  }
});
homeSchema.index( { price: 1, bedrooms: 1, bathrooms: 1 } );
var listing = mongoose.model('listing', homeSchema);
