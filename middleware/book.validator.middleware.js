const CustomErrorhandler = require("../error/custom-error.handler")
const bookValidator = require("../validator/book.validate")

module.exports = function (req, res, next) {
  const {error} = bookValidator(req.body)

  if (error) {
    throw CustomErrorhandler.BadRequest(error.message)
  }

  next()
}