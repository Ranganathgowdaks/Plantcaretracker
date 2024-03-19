const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  desc:{
    type:String
  }
});

// Model
const Plant = mongoose.model('Plant', plantSchema);
module.exports = Plant;