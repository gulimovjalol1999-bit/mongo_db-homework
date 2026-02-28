const { hash } = require("bcryptjs");
const CustomErrorhandler = require("../error/custom-error.handler");
const AuthSchema = require("../schema/auth.schema");
const sendMessage = require("../utils/send-email");
const { access_token } = require("../utils/jwt");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const foundedUser = await AuthSchema.findOne({ email });

    if (foundedUser) {
      throw CustomErrorhandler.BadRequest("User already exist");
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const code = +Array.from({ length: 6 }, () =>
      Math.round(Math.random() * 6),
    ).join("");

    sendMessage(code, email);

    await AuthSchema.create({
      username,
      email,
      password: hashPassword,
      otp: code,
      otpTime: Date.now() + 120000,
    });

    res.status(201).json({ message: "Registered" });
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const foundedUser = await AuthSchema.findOne({ email });

    if (!foundedUser) {
      throw CustomErrorhandler.BadRequest("User not found");
    }

    if (!foundedUser.otp) {
      throw CustomErrorhandler.UnAuthorized("Otp not found");
    }

    if (foundedUser.otp !== code) {
      throw CustomErrorhandler.UnAuthorized("Wrong otp");
    }

    if (foundedUser.otpTime < Date.now()) {
      throw CustomErrorhandler.UnAuthorized("Otp expired");
    }

    await AuthSchema.findByIdAndUpdate(foundedUser._id, {otp: "", otpTime: 0})

    const token = access_token({id: foundedUser._id, role: foundedUser.role, email: foundedUser.email})

    res.cookie("access_token", token, {maxAge: 1000 * 60 * 15})

    res.status(200).json({ 
      message: "Success",
      token 
    });
  } catch (error) {
    next(error);
  }
};

console.log("salom");

module.exports = {
  register,
  verify,
};
