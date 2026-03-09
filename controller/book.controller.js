const CustomErrorhandler = require("../error/custom-error.handler");
const BookSchema = require("../schema/book.schema");
const QuoteSchema = require("../schema/quote.schema");
const path = require("path");
const fs = require("fs");

const getAllBooks = async (req, res, next) => {
  try {
    // const books = await BookSchema.find().populate("authorInfo");

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "createdAt";
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    const query = {};

    if (search.trim()) {
      query.fullName = { $regex: search, $options: "i" };
    }

    const total = await BookSchema.countDocuments(query);

    const books = await BookSchema.find()
      .populate("authorInfo")
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      total: Math.ceil(total / limit),
      prev: page > 1 ? { page: page - 1, limit } : undefined,
      next: total > page * limit ? { page: page + 1 } : undefined,
      data: books,
    });

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

const getOneBook = async (req, res, next) => {
  try {
    // const {title, pages, publishedYear, publishedHome, description, period, imageUrl} = req.body
    const { id } = req.params;

    const foundedBook = await BookSchema.findById(id)
      .populate("authorInfo")
      .populate("quotes");

    if (!foundedBook) {
      throw CustomErrorhandler.NotFound("Not found");
    }

    const reccomendation = await BookSchema.find({
      genre: foundedBook.genre,
    });

    res.status(200).json({
      foundedBook,
      reccomendation,
    });
  } catch (error) {
    next(error);
  }
};

const addBook = async (req, res, next) => {
  try {
    console.log("ishladi");
    const {
      title,
      pages,
      publishedYear,
      publishedHome,
      description,
      period,
      genre,
      imageUrl,
      authorInfo,
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
      authorInfo,
    });

    res.status(201).json({
      message: "Added new Book",
    });
  } catch (error) {
    next(error);
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
      authorInfo,
    } = req.body;
    const { id } = req.params;

    const foundedBook = await BookSchema.findById(id);

    if (!foundedBook) {
      throw CustomErrorhandler.NotFound("Not found");
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
      authorInfo,
    });

    res.status(200).json({
      message: "Updated Book",
    });
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundedBook = await BookSchema.findById(id);

    if (!foundedBook) {
      throw CustomErrorhandler.NotFound("Not found");
    }

    await BookSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "Deleted Book",
    });
  } catch (error) {
    next(error);
  }
};

const uploadFileBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    const foundedBook = await BookSchema.findById(bookId);

    if (!foundedBook) {
      throw CustomErrorhandler.NotFound("Not found");
    }

    if (foundedBook.audioUrl) {
      const fileUrl = path.join(__dirname, "..", foundedBook.audioUrl);

      if (fs.existsSync(fileUrl)) {
        fs.unlinkSync(fileUrl);
      }
    }

    const changer = req.file.path.replace(/\\/, "/");
    foundedBook.audioUrl = changer;
    foundedBook.save();

    res.status(201).json({
      message: changer,
    });
  } catch (error) {
    return res.json(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBooks,
  getOneBook,
  addBook,
  updateBook,
  deleteBook,
  uploadFileBook,
};
