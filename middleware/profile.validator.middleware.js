// const CustomErrorhandler = require("../error/custom-error.handler")
// const { validateUpdateProfile } = require("../validator/profile.validate")

// module.exports = function (req, res, next) {
//   const {error} = validateUpdateProfile(req.body)

//   if (error) {
//     throw CustomErrorhandler.BadRequest(error.message)
//   }

//   next()
// }

const CustomErrorhandler = require("../error/custom-error.handler");
const { validateUpdateProfile, validateChangePassword, validateUploadAvatar } = require("../validator/profile.validate");

module.exports = function (req, res, next) {
  let error;

  if (req.path === "/update") {
    ({ error } = validateUpdateProfile(req.body));
  } else if (req.path === "/change_password") {
    ({ error } = validateChangePassword(req.body));
  } else if (req.path === "/upload_avatar") {
    ({error} = validateUploadAvatar(req.body))
  }

  if (error) {
    throw CustomErrorhandler.BadRequest(error.message);
  }

  next();
};