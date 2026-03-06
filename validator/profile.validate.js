// const joi = require("joi")

// const profileValidator = (data) => {
//   const schema = joi.object({
//     firstName: joi.string(),
//     lastName: joi.string(),
//     email: joi.string().required(),
//     phoneNumber: joi.string(),
//     password: joi.string().required(),
//     currentPassword: joi.string.required(),
//     newPassword: joi.string().required(),
//     avatar: joi.string().required(false),
//     bio: joi.string()
//   })

//   return schema.validate(data)
// } 

// module.exports = profileValidator

const Joi = require("joi");

const validateUpdateProfile = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).trim().messages({
      "string.min": "First name must be at least 2 characters",
      "string.max": "First name must be at most 50 characters",
    }),
    lastName: Joi.string().min(2).max(50).trim().messages({
      "string.min": "Last name must be at least 2 characters",
      "string.max": "Last name must be at most 50 characters",
    }),
    bio: Joi.string().max(300).allow("").trim().messages({
      "string.max": "Bio must be at most 300 characters",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

const validateChangePassword = (data) => {
  const schema = Joi.object({
    currentPassword: Joi.string().required().messages({
      "any.required": "Current password is required",
      "string.empty": "Current password cannot be empty",
    }),
    newPassword: Joi.string().min(6).max(32).required().messages({
      "any.required": "New password is required",
      "string.empty": "New password cannot be empty",
      "string.min": "New password must be at least 6 characters",
      "string.max": "New password must be at most 32 characters",
    }),
    confirmPassword: Joi.string().required().messages({
      "any.required": "Password is required",
      "string.empty": "Password cannot be empty",
    }),
  });
  
  return schema.validate(data, { abortEarly: false });
};

const validateUploadAvatar = (data) => {
  const schema = Joi.object({
    avatar: Joi.string().required()
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { validateUpdateProfile, validateChangePassword, validateUploadAvatar };