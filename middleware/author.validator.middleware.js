const CustomErrorhandler = require("../error/custom-error.handler")
const authorValidator = require("../validator/author.validate")

module.exports = function (req, res, next) {
  const {error} = authorValidator(req.body)

  if (error) {
    throw CustomErrorhandler.BadRequest(error.message)
  }

  next()
}
