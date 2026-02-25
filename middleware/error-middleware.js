const CustomErrorhandler = require("../error/custom-error.handler")

module.exports = function(err, req, res, next) {
  if(err instanceof CustomErrorhandler) {
    return res.status(err.status || 400).json({message: err.message, errors: err.errors})
  }

  console.log(err);
  
}