const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  distance: { type: String },
  rating: { type: Number },
  contact: { type: String },
  address: { type: String },
  hours: { type: String }
});

module.exports = mongoose.model('Shop', shopSchema);