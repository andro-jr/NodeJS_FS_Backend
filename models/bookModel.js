const mongoose = require("moongose");

const bookSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  author: {
    typw: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
  },
  numberOfPages: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  yearPublished: {
    type: String,
    required: true,
  },
});

mongoose.exports = mongoose.model("Book", bookSchema);
