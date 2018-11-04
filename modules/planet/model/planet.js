const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const PlanetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique : true,
    trim: true,
  },
  climate: {
    type: String,
    required: true,
    trim: true,
  },
  terrain: {
    type: String,
    required: true,
    trim: true,
  },
  numbersOfMovies: {
    type: Number,
    required: false,
  },
});

PlanetSchema.plugin(timestamps);

const Planet = mongoose.model('Planet', PlanetSchema);
module.exports = Planet;