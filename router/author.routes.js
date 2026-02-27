const {Router} = require("express")
const { getAllAuthors, getOneAuthor, addAuthor, updateAuthor, deleteAuthor, search } = require("../controller/author.controller")
const authorValidatorMiddleware = require("../middleware/author.validator.middleware")

const authorRouter = Router()

authorRouter.get("/get_all_authors", getAllAuthors)
authorRouter.get("/search", search)
authorRouter.get("/get_one_author/:id", getOneAuthor)
authorRouter.post("/add_author", authorValidatorMiddleware, addAuthor)
authorRouter.put("/update_author/:id", updateAuthor)
authorRouter.delete("/delete_author/:id", deleteAuthor)

module.exports = authorRouter