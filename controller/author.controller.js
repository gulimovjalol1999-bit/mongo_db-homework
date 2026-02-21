const AuthorSchema = require("../schema/author.schema");

const getAllAuthors = async (req, res) => {
  try {
    const authors = await AuthorSchema.find();

    res.status(200).json(authors);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneAuthor = async (req, res) => {
  try {
    // const {fullName, birthDate, deathDate, bio, work, period, imageUrl} = req.body
    const { id } = req.params;

    const foundedAuthor = await AuthorSchema.findById(id);

    if (!foundedAuthor) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    res.status(200).json(foundedAuthor);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addAuthor = async (req, res) => {
  try {
    const { fullName, birthDate, deathDate, bio, work, period, imageUrl } =
      req.body;

    await AuthorSchema.create({
      fullName,
      birthDate,
      deathDate,
      bio,
      work,
      period,
      imageUrl,
    });

    res.status(201).json({
      message: "Added new author",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const { fullName, birthDate, deathDate, bio, work, period, imageUrl } =
      req.body;
    const { id } = req.params;

    const foundedAuthor = await AuthorSchema.findById(id);

    if (!foundedAuthor) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    await AuthorSchema.findByIdAndUpdate(id, {
      fullName,
      birthDate,
      deathDate,
      bio,
      work,
      period,
      imageUrl,
    });

    res.status(200).json({
      message: "Updated author",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const foundedAuthor = await AuthorSchema.findById(id);

    if (!foundedAuthor) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    await AuthorSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "Deleted author",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAuthors,
  getOneAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor,
};
