const joi = require("joi")

const quoteValidator = (data) => {
  const schema = joi.object({
    text: joi.string().min(3).max(500).required(),
    book: joi.string().required(),
    author: joi.string().required(),
  })

  return schema.validate(data)
} 

module.exports = quoteValidator