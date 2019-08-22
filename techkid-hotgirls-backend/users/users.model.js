const mongoose = require('mongoose');

// email => required, unique
// password => required
// fullName => required
// createdAt

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const UsersModel = mongoose.model('User', UserSchema);

module.exports = UsersModel;