const {Router} = require("express")
const { getAllBooks, getOneBook, addBook, updateBook, deleteBook } = require("../controller/book.controller")
const authorValidatorMiddleware = require("../middleware/author.validator.middleware")

const bookRouter = Router()

bookRouter.get("/get_all_books", getAllBooks)
bookRouter.get("/get_one_book/:id", getOneBook)
bookRouter.post("/add_book", authorValidatorMiddleware, addBook)
bookRouter.put("/update_book/:id", updateBook)
bookRouter.delete("/delete_book/:id", deleteBook)

module.exports = bookRouter