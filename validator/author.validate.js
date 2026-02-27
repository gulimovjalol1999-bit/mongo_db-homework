const joi = require("joi")

const authorValidator = (data) => {
  const schema = joi.object({
    fullName: joi.string().min(3).max(50).pattern(new RegExp(/^[a-zA-Z\s]+$/)).required(),
    birthDate: joi.date().required(),
    deathDate: joi.string().required(),
    period: joi.string().valid("Temuriylar davri", "Sovet davri", "Jadid davri", "Mustaqillik davri").required(),
    bio: joi.string().required(),
    work: joi.string().required(),
    imageUrl: joi.string().required()
  })
} 

module.exports = authorValidator