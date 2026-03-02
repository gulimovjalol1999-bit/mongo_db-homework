const joi = require("joi")

const bookValidator = (data) => {
  const schema = joi.object({
    title: joi.string().min(3).max(50).required(),
    pages: joi.number().integer().min(30).max(5000).required(),
    publishedYear: joi.number().required(),
    publishedHome: joi.string().min(3).max(100).required(),
    description: joi.string().required(),
    period: joi.string().valid("Temuriylar davri", "Sovet davri", "Jadid davri", "Mustaqillik davri").required(),
    genre: joi.string().valid("Comedy", "Romance", "Thriller", "Horror", "Action", "Documentary", "Science fiction", "Fantasy", "History"),
    imageUrl: joi.string().required(),
    authorInfo: joi.string()
  })

  return schema.validate(data)
} 

module.exports = bookValidator