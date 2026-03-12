const joi = require("joi")

const modelValidator = (data) => {
  const schema = joi.object({
    model: joi.string().trim().min(2).max(50).valid("CHEVROLET", "LADA", "LAMBORGHINI", "FERRARI").required(),
    modelImage: joi.string().required(),
    
  })

  return schema.validate(data)
} 

module.exports = modelValidator