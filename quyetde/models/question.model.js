const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionContent: {
    type: String,
    required: true,
  },
  like: {
    type: Number,
    default: 0,
  },
  dislike: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
QuestionSchema.index({questionContent:'text'});
const questionModel = mongoose.model('Question', QuestionSchema);

module.exports = questionModel;