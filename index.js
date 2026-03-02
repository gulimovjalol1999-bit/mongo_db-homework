const express = require("express")
const cors = require("cors")
const connectDb = require("./config/db.config")
const authorRouter = require("./router/author.routes")
const bookRouter = require("./router/book.routes")
const errorMiddleware = require("./middleware/error-middleware")
const authRouter = require("./router/auth.routes")
const cookieParser = require("cookie-parser")
const quoteRouter = require("./router/quote.routes")
require("dotenv").config()

const PORT = process.env.PORT || 3000
const app = express()

connectDb() 
app.use(express.json())
app.use(cors()) 
app.use(cookieParser())


//router
app.use(authorRouter)
app.use(bookRouter) 
app.use(authRouter)
app.use(quoteRouter)

app.use(errorMiddleware) 

 
app.listen(PORT, () => {
  console.log("Server is running at: " + PORT)  
})