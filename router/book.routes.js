const {Router} = require("express")
const { getAllBooks, getOneBook, addBook, updateBook, deleteBook, uploadFileBook } = require("../controller/book.controller")

const authorization = require("../middleware/authorization")
const bookValidatorMiddleware = require("../middleware/book.validator.middleware")
const upload = require("../middleware/upload")
const stream = require("../controller/audio.controller")

const bookRouter = Router()

bookRouter.get("/get_all_books", getAllBooks)
bookRouter.get("/get_one_book/:id", getOneBook)
bookRouter.post("/add_book", bookValidatorMiddleware, addBook)
bookRouter.put("/update_book/:id", updateBook)
bookRouter.delete("/delete_book/:id", deleteBook)

bookRouter.post("/books/:bookId/audio", upload.single("audio"), uploadFileBook)
bookRouter.get("/books/:bookId/audio", stream)

module.exports = bookRouter