const mongoose = require('mongoose');

// createdAt: Date
// content: string
// views: number
// imageUrl: string
// author: User

const PostSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },
  content: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
const PostsModel = mongoose.model('Post', PostSchema);

module.exports = PostsModel;