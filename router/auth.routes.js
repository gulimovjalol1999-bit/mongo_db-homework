const {Router} = require("express")
const { register, verify, login, logout } = require("../controller/auth.controller")
const authorization = require("../middleware/authorization")
const refresh_token = require("../middleware/refresh_token")


const authRouter = Router()

authRouter.post("/register", register)
authRouter.post("/verify", verify)
authRouter.post("/login", login)
authRouter.get("/logout", authorization, logout)
authRouter.get("/refresh", refresh_token)



module.exports = authRouter