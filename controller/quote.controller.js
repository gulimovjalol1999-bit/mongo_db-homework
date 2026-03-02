const CustomErrorhandler = require("../error/custom-error.handler");
const QuoteSchema = require("../schema/quote.schema");

const getAllQuotes = async (req, res, next) => {
  try {
    const books = await QuoteSchema.find().populate("quote");


    res.status(200).json(books);
  } catch (error) {
    next(error)
  }
};

const getOneQuote = async (req, res, next) => {
  try {
    // const {title, pages, publishedYear, publishedHome, description, period, imageUrl} = req.body
    const { id } = req.params;

    const foundedBook = await QuoteSchema.findById(id);

    if (!foundedBook) {
      throw CustomErrorhandler.NotFound("Not found")
    }

    res.status(200).json(foundedBook);
  } catch (error) {
    next(error)
  }
};

const addQuote = async (req, res, next) => {
  try {
    console.log("ishladi");
    const {
      text,
      book,
      author
    } = req.body;

    await QuoteSchema.create({
      text,
      book,
      author
    });

    res.status(201).json({
      message: "Added new Quote",
    });
  } catch (error) {
    next(error)
  }
};

const updateQuote = async (req, res, next) => {
  try {
    const {
      text,
      book,
      author
    } = req.body;
    const { id } = req.params;

    const foundedBook = await QuoteSchema.findById(id);

    if (!foundedBook) {
      throw CustomErrorhandler.NotFound("Not found")
    }

    await QuoteSchema.findByIdAndUpdate(id, {
      title,
      pages,
      publishedYear,
      publishedHome,
      description,
      period,
      genre,
      imageUrl,
      authorInfo
    });

    res.status(200).json({
      message: "Updated Book",
    });
  } catch (error) {
    next(error)
  }
};

const deleteQuote = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundedBook = await QuoteSchema.findById(id);

    if (!foundedBook) {
      throw CustomErrorhandler.NotFound("Not found")
    }

    await QuoteSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "Deleted Book",
    });
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getAllQuotes,
  getOneQuote,
  addQuote,
  updateQuote,
  deleteQuote,
};