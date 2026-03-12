const express = require("express")
const cors = require("cors")
const connectDb = require("./config/db.config")
const errorMiddleware = require("./middleware/error-middleware")
const authRouter = require("./router/auth.routes")
const cookieParser = require("cookie-parser")
const logger = require("./utils/logger")
const carRouter = require("./router/car.routes")
const modelRouter = require("./router/model.routes")
const profileRouter = require("./router/profile.routes")
require("dotenv").config()

const PORT = process.env.PORT || 3000 
const app = express() 

connectDb() 
app.use(express.json())
app.use(cors()) 
app.use(cookieParser()) 


//router
app.use(authRouter)
app.use(profileRouter)
app.use(modelRouter)
app.use(carRouter)

app.use(errorMiddleware) 

//logger
// logger.warn("Console logger")
// logger.error("Erro logger")
// logger.info("Info logger")
// logger.debug("Debug logger")

 
app.listen(PORT, () => {
  console.log("Server is running at: " + PORT)  
})
