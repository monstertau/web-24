const mongoose = require("mongoose");
userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  fullName: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});
const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
