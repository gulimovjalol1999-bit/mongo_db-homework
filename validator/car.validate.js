const joi = require("joi")

const carValidator = (data) => {
  const schema = joi.object({
    title: joi.string().required(),
    model: joi.string().valid("CHEVROLET", "LADA", "LAMBORGHINI", "FERRARI").required(),
    tonirovkasi: joi.string().required(),
    motor: joi.string().required(),
    year: joi.date().required(),
    color: joi.string().required(),
    distance: joi.string().required(),
    gearBook: joi.string().required(),
    description: joi.string().required(),
    umumiyXarajat: joi.string().required(),

  })

  return schema.validate(data)
} 

module.exports = carValidator