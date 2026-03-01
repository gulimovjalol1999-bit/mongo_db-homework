const bcrypt = require("bcryptjs");
const { hash } = require("bcryptjs");
const CustomErrorhandler = require("../error/custom-error.handler");
const AuthSchema = require("../schema/auth.schema");
const sendMessage = require("../utils/send-email");
const { access_token, refresh_token } = require("../utils/jwt");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const foundedUser = await AuthSchema.findOne({ email });

    if (foundedUser) {
      throw CustomErrorhandler.BadRequest("User already exist");
    }

    const hashPassword = await bcrypt.hash(password, 12);

    // const code = +Array.from({ length: 6 }, () => Math.round(Math.random() * 6)).join("");
    const code = Math.floor(100000 + Math.random() * 900000).toString();

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

    await AuthSchema.findByIdAndUpdate(foundedUser._id, {
      otp: "",
      otpTime: 0,
    });

    const acessToken = access_token({
      id: foundedUser._id,
      role: foundedUser.role,
      email: foundedUser.email,
    });
    const refreshToken = refresh_token({
      id: foundedUser._id,
      role: foundedUser.role,
      email: foundedUser.email,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true, // XSS(CROSS-SITE SCRIPTING)
      secure: true, // https
      sameSite: "strict", // CSRF(CROSS-SITE REQUEST FORGERY)
      maxAge: 1000 * 60 * 15,
    });

    res.status(200).json({
      message: "Success",
      accessToken: acessToken,
    });
  } catch (error) {
    next(error);
  }
};

<<<<<<< HEAD
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundedUser = await AuthSchema.findOne({ email });

    if (!foundedUser) {
      throw CustomErrorhandler.BadRequest("User not found");
    }

    const check = await bcrypt.compare(password, foundedUser.password);

    if (check) {
      // const code = +Array.from({ length: 6 }, () => Math.round(Math.random() * 6)).join("");
      const code = Math.floor(100000 + Math.random() * 900000).toString();

      sendMessage(code, email);

      await AuthSchema.findByIdAndUpdate(foundedUser._id, {
        otp: code,
        otpTime: Date.now() + 1200000,
      });

      res.status(201).json({ message: "Please check your email" });
    } else {
      throw CustomErrorhandler.UnAuthorized("Wrong password");
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const foundedUser = await AuthSchema.findOne({ email: req["user"].email });

    if (!foundedUser) {
      throw CustomErrorhandler.BadRequest("User not found");
    }

    // const check = await bcrypt.compare(password, foundedUser.password);

    // const code = Math.floor(100000 + Math.random() * 900000).toString();

    res.clearCookie("refresh_token")
    await AuthSchema.findByIdAndUpdate(foundedUser._id, {
      refreshToken: ""
    });

    res.status(201).json({ message: "Logged out" });
  } catch (error) {
    next(error);
  }
};
=======
console.log("salom");
>>>>>>> 5c59b6c7c42006124ac5923c449f6bd3cae026c0

module.exports = {
  register,
  verify,
  login,
  logout
};
