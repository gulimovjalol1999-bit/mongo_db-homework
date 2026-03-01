const {Router} = require("express")
const { getAllAuthors, getOneAuthor, addAuthor, updateAuthor, deleteAuthor, search } = require("../controller/author.controller")
const authorValidatorMiddleware = require("../middleware/author.validator.middleware")
const authorization = require("../middleware/authorization")

const authorRouter = Router()

authorRouter.get("/get_all_authors", getAllAuthors)
authorRouter.get("/search", search)
authorRouter.get("/get_one_author/:id", getOneAuthor)
authorRouter.post("/add_author", authorValidatorMiddleware, authorization, addAuthor)
authorRouter.put("/update_author/:id", authorization, updateAuthor)
authorRouter.delete("/delete_author/:id", authorization, deleteAuthor)

module.exports = authorRouter