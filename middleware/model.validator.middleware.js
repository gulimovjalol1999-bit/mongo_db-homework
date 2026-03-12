const CustomErrorhandler = require("../error/custom-error.handler")
const modelValidator = require("../validator/model.validate")

module.exports = function (req, res, next) {
  const {error} = modelValidator(req.body)

  if (error) {
    throw CustomErrorhandler.BadRequest(error.message)
  }

  next()
}