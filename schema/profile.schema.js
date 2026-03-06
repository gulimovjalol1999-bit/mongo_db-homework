const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: false,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: false,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: false,
      validate: {
        validator: function (value) {
          return /^\+998\d{2} \d{3} \d{2} \d{2}$/.test(value);
        },
        message:
          "Phone number: +998XX XXX XX XX shunday formatda bolishi kerak",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },
    // currentPassword: {
    //   type: String,
    //   required: [true, "Password is required"],
    //   minlength: 6,
    //   select: false,
    // },
    // confirmPassword: {
    //   type: String,
    //   required: [true, "Password is required"],
    //   minlength: 6,
    //   select: false,
    // },
    avatar: {
      type: String,
      default: null,
      // required: false,
    },
    bio: {
      type: String,
      maxlength: 300,
      default: "",
      required: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model("User", UserSchema);
