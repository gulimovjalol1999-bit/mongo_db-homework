const express = require("express")
const cors = require("cors")
const connectDb = require("./config/db.config")
const authorRouter = require("./router/author.routes")
const bookRouter = require("./router/book.routes")
const errorMiddleware = require("./middleware/error-middleware")
require("dotenv").config()

const PORT = process.env.PORT || 3000
const app = express()

connectDb() 
app.use(express.json())
app.use(cors()) 


//router
app.use(authorRouter)
app.use(bookRouter) 

app.use(errorMiddleware) 

 
app.listen(PORT, () => {
  console.log("Server is running at: " + PORT)  
})