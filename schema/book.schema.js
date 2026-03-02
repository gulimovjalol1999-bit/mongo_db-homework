const {Schema, model} = require("mongoose")

const Book = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 200
  },
  pages: {
    type: Number,
    required: true,
    min: 30, 
    max: 5000
  },
  publishedYear: {
    type: Number,
    required: true
  },
  publishedHome: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100
  },
  description: {
    type: String,
    required: true
  },
  period: {
    type: String,
    required: true,
    enum: {
      values: ["Temuriylar davri", "Sovet davri", "Jadid davri", "Mustaqillik davri"],
      message: "{VALUE} bunday qiymat qabul qilinmaydi"
    }
  },
  genre: {
    type: String,
    required: true,
    enum: {
      values: ["Comedy", "Romance", "Thriller", "Horror", "Action", "Documentary", "Science fiction", "Fantasy", "History"],
      message: "{VALUE} bunday qiymat qabul qilinmaydi"
    }
  },
  imageUrl: {
    type: String,
    required: true
  },
  authorInfo: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "author"
  },
  quote: {
    
  }
}, {
  versionKey: false,
  timestamps: true
})

Book.virtual("quotes", {
  ref: "quote",
  localField: "_id",
  foreignField: "book"
})

Book.set("toObject", { virtuals: true })
Book.set("toJSON", { virtuals: true })

const BookSchema = model("book", Book)
module.exports = BookSchema