const {Schema, model} = require("mongoose")

const Quote = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    book: {
      type: Schema.Types.ObjectId, 
      ref: "Book",
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: true
    }
  },
  { 
    versionKey: false,
    timestamps: true
  }
)

const QuoteSchema = model("quote", Quote)

module.exports = QuoteSchema