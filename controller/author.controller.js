const { query } = require("winston");
const CustomErrorhandler = require("../error/custom-error.handler");
const AuthorSchema = require("../schema/author.schema");
const BookSchema = require("../schema/book.schema");

const getAllAuthors = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const sort = req.query.sort || "createdAt"
    const search = req.query.search || ""

    const skip = (page - 1) * limit
    

    const query = {}

    if (search.trim()) {
      query.fullName = {$regex: search, $options: "i"}
    }

    const total = await AuthorSchema.countDocuments(query)

    const authors = await AuthorSchema.find()
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)

    res.status(200).json({
      total: Math.ceil(total / limit),
      prev: page > 1 ? {page: page - 1, limit} : undefined,
      next: total > page * limit ? {page: page + 1} : undefined,
      data: authors
    })
  } catch (error) {
    next(error)
  }
};

// const search = async (req, res, next) => {
//   try {
//     const {searchingValue} = req.query 
//     const result = await AuthorSchema.find({
//       fullName: {$regex: searchingValue, $options: "i"},
//     });

//     res.status(200).json(result);
//   } catch (error) {
//     next(error)
//   }
// };

const getOneAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundedAuthor = await AuthorSchema.findById(id);

    if (!foundedAuthor) {
      throw CustomErrorhandler.NotFound("Not found")
    }

    const reccomandation = await BookSchema.find({
      authorInfo: id
    })

    res.status(200).json({
      foundedAuthor,
      reccomandation
    });
  } catch (error) {
    next(error)
  }
};

const addAuthor = async (req, res, next) => {
  try {
    const { fullName, birthDate, deathDate, bio, work, period, imageUrl, phoneNumber } =
      req.body;

    await AuthorSchema.create({
      fullName,
      birthDate,
      deathDate,
      bio,
      work,
      period,
      imageUrl,
      phoneNumber
    });

    res.status(201).json({
      message: "Added new author",
    });
  } catch (error) {
    next(error)
  }
};

const updateAuthor = async (req, res, next) => {
  try {
    const { fullName, birthDate, deathDate, bio, work, period, imageUrl, phoneNumber } =
      req.body;
    const { id } = req.params;

    const foundedAuthor = await AuthorSchema.findById(id);

    if (!foundedAuthor) {
      throw CustomErrorhandler.NotFound("Not found")
    }

    await AuthorSchema.findByIdAndUpdate(id, {
      fullName,
      birthDate,
      deathDate,
      bio,
      work,
      period,
      imageUrl,
      phoneNumber
    });

    res.status(200).json({
      message: "Updated author",
    });
  } catch (error) {
    next(error)
  }
};

const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundedAuthor = await AuthorSchema.findById(id);

    if (!foundedAuthor) {
      throw CustomErrorhandler.NotFound("Not found")
    }

    await AuthorSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "Deleted author",
    });
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getAllAuthors,
  getOneAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor,
  // search
};
