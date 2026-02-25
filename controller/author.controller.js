const CustomErrorhandler = require("../error/custom-error.handler");
const AuthorSchema = require("../schema/author.schema");

const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await AuthorSchema.find();

    res.status(200).json(authors);
  } catch (error) {
    next(error)
  }
};

const search = async (req, res, next) => {
  try {
    const {searchingValue} = req.query 
    const result = await AuthorSchema.find({
      fullName: {$regex: searchingValue, $options: "i"},
    });

    res.status(200).json(result);
  } catch (error) {
    next(error)
  }
};

const getOneAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundedAuthor = await AuthorSchema.findById(id);

    if (!foundedAuthor) {
      throw CustomErrorhandler.NotFound("Not found")
    }

    res.status(200).json(foundedAuthor);
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
  search
};
