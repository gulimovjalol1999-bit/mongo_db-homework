const CustomErrorhandler = require("../error/custom-error.handler");
const BookSchema = require("../schema/book.schema");

const getAllBooks = async (req, res, next) => {
  try {
    const books = await BookSchema.find().populate("authorInfo");

    res.status(200).json(books);
  } catch (error) {
    next(error)
  }
};

const getOneBook = async (req, res, next) => {
  try {
    // const {title, pages, publishedYear, publishedHome, description, period, imageUrl} = req.body
    const { id } = req.params;

    const foundedBook = await BookSchema.findById(id);

    if (!foundedBook) {
      throw CustomErrorhandler.NotFound("Not found")
    }

    res.status(200).json(foundedBook);
  } catch (error) {
    next(error)
  }
};

const addBook = async (req, res, next) => {
  try {
    const {
      title,
      pages,
      publishedYear,
      publishedHome,
      description,
      period,
      genre,
      imageUrl,
      authorInfo
    } = req.body;

    await BookSchema.create({
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

    res.status(201).json({
      message: "Added new Book",
    });
  } catch (error) {
    next(error)
  }
};

const updateBook = async (req, res, next) => {
  try {
    const {
      title,
      pages,
      publishedYear,
      publishedHome,
      description,
      period,
      genre,
      imageUrl,
      authorInfo
    } = req.body;
    const { id } = req.params;

    const foundedBook = await BookSchema.findById(id);

    if (!foundedBook) {
      throw CustomErrorhandler.NotFound("Not found")
    }

    await BookSchema.findByIdAndUpdate(id, {
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

const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundedBook = await BookSchema.findById(id);

    if (!foundedBook) {
      throw CustomErrorhandler.NotFound("Not found")
    }

    await BookSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "Deleted Book",
    });
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getAllBooks,
  getOneBook,
  addBook,
  updateBook,
  deleteBook,
};
