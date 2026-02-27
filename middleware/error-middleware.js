const CustomErrorhandler = require("../error/custom-error.handler");

module.exports = function (err, req, res, next) {
  try{
    if (err instanceof CustomErrorhandler) {
    return res
      .status(err.status || 400)
      .json({ message: err.message, errors: err.errors });
  }

  if (err.name === "ValidationError") {
    const validationErrors = Object.values(err.errors).map(
      (error) => error.message,
    );

    res.status(400).json({
      messageName: "ValidationError",
      error: validationErrors,
    });
  }
  }catch(error) {
    return res.status(500).json({
      message: error.message
    })
  }
};
