const CustomErrorhandler = require("../error/custom-error.handler")
const quoteValidator = require("../validator/quote.validate")

module.exports = function (req, res, next) {
  const {error} = quoteValidator(req.body)

  if (error) {
    throw CustomErrorhandler.BadRequest(error.message)
  }

  next()
}