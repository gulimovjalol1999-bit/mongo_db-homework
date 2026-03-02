const {Router} = require("express")
const { getAllQuotes, getOneQuote, addQuote, updateQuote, deleteQuote } = require("../controller/quote.controller")
const quoteValidatorMiddleware = require("../middleware/quote.validator.middleware")
const authorization = require("../middleware/authorization")

const quoteRouter = Router()

quoteRouter.get("/get_all_quotes", getAllQuotes)
quoteRouter.get("/get_one_quote/:id", getOneQuote)
quoteRouter.post("/add_quote", quoteValidatorMiddleware, addQuote)
quoteRouter.put("/update_quote/:id", quoteValidatorMiddleware, updateQuote)
quoteRouter.delete("/delete_quote/:id", quoteValidatorMiddleware, deleteQuote)

module.exports = quoteRouter