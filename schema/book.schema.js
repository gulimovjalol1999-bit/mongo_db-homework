const {Schema, model} = require("mongoose")

const Book = new Schema({
  title: {
    type: String,
    required: true
  },
  pages: {
    type: Number,
    required: true
  },
  publishedYear: {
    type: Number,
    required: true
  },
  publishedHome: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  period: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
})

const BookSchema = model("book", Book)
module.exports = BookSchema