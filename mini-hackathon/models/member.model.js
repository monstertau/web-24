const mongoose = require('mongoose'), Schema = mongoose.Schema, Mixed = Schema.Types.Mixed;

const playerSchema = new mongoose.Schema({
  playerName : [String],
  score: {type: Mixed, default: []},
  round: {
    type: Number,
    default: 0,
  }
});
const playerModel = mongoose.model('player', playerSchema);
module.exports = playerModel;