const {Router} = require("express")
const { getMyProfile, updateProfile, deleteAccount, changePassword, uploadAvatar, register } = require("../controller/profile.controller");
const authorization = require("../middleware/authorization");
const uploadA = require("../middleware/uploadAvatar");
const profileValidatorMiddleware = require("../middleware/profile.validator.middleware");

const profileRouter = Router()

profileRouter.post("/add_profile", register);
profileRouter.get("/me/:id", profileValidatorMiddleware, authorization, getMyProfile);
profileRouter.put("/update/:id", profileValidatorMiddleware, authorization, updateProfile);
profileRouter.put("/change_password/:id", profileValidatorMiddleware, authorization, changePassword);
profileRouter.put("/upload_avatar/:id", authorization, uploadA.single("avatar"), profileValidatorMiddleware, authorization, uploadAvatar);
profileRouter.delete("/delete/:id", profileValidatorMiddleware, authorization, deleteAccount);

module.exports = profileRouter