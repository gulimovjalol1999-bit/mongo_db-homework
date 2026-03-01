const {Schema, model} = require("mongoose")

const Auth = new Schema({
  username: {
    type: String,
    required: [true, "username berilishi shart"],
    minLength: [3, "kamida 3ta harfdan iborat bolishi kerak"],
    maxLength: [50, "ko'pi bilan 50ta harfdan iborat bo'lishi kerak"],
    set: (value) => value.trim(),
  },
  email: {
    type: String,
    required: [true, "email berilishi shart"]
  },
  password: {
    type: String,
    required: [true, "password berilishi shart"]
  },
  role: {
    type: String,
    default: "user"
  },
  otp: {
    type: String,
    // required: true
  },
  otpTime: {
    type: Number,
    required: true,
  },
  refreshToken: {
    type: String,
  },
}, {
  versionKey: false,
  timestamps: true
})

Auth.statics.findByFullName = function(value) {
  return this.find({fullName: value})
}

const AuthSchema = model("auth", Auth)
module.exports = AuthSchema