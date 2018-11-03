const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const PlanetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
  },
  { minimize: false },
);

PlanetSchema.plugin(timestamps);
PlanetSchema.plugin(mongooseStringQuery);

const Planet = mongoose.model('Planet', PlanetSchema);
module.exports = Planet;