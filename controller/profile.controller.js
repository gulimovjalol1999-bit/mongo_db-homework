const User = require("../schema/profile.schema");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const CustomErrorhandler = require("../error/custom-error.handler");
const { validateUpdateProfile } = require("../validator/profile.validate");

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, avatar, bio } =
      req.body;

    const foundedUser = await User.findOne({ email });

    if (foundedUser) {
      throw CustomErrorhandler.BadRequest("User already exist");
    }

    const hashPassword = await bcrypt.hash(password, 12);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      phoneNumber,
      avatar,
      bio,
    });

    res.status(201).json({ message: "Registered" });
  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(id);

    const { id } = req.params;
    if (!user) {
      return next(CustomErrorhandler.NotFound("User not found"));
    }

    res.status(200).json({
      user,
      // success: true,
      // data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, bio, phoneNumber } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email, bio, phoneNumber },
    );

    if (!updatedUser) {
      return next(CustomErrorhandler.NotFound("User not found"));
    }

    res.status(200).json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !confirmPassword) {
      return next(
        CustomErrorhandler.NotFound("Please provide current and new password"),
      );
    }
    const {id} = req.params
    const user = await User.findById(id).select("+password");

    if (!user) {
      return next(CustomErrorhandler.NotFound("User not found"));
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return next(CustomErrorhandler.NotFound("Current password is incorrect"));
    }

    if (newPassword !== currentPassword) {
      return next(CustomErrorhandler.BadRequest("currnetpassword bilan newpassword bir xil emas"))
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(confirmPassword, salt);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(CustomErrorhandler.NotFound("Please upload an image file"));
    }
    const {id} = req.params
    const user = await User.findById(id);

    if (!user) {
      return next(CustomErrorhandler.NotFound("User not found"));
    }

    if (user.avatar) {
      const oldAvatarPath = path.join(__dirname, "..", user.avatar);
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlinkSync(oldAvatarPath);
      }
    }

    user.avatar = req.file.path;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Avatar uploaded successfully",
      avatar: req.file.path,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const {id} = req.params
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return next(CustomErrorhandler.NotFound("User not found"));
    }

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  getMyProfile,
  updateProfile,
  changePassword,
  uploadAvatar,
  deleteAccount,
};
