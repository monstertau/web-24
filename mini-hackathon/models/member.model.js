const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  playerName : [String],
  score: [[Number]],
  round: {
    type: Number,
    default: 0,
  }
});
const playerModel = mongoose.model('player', playerSchema);
module.exports = playerModel;