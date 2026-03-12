const CustomErrorhandler = require("../error/custom-error.handler");
const path = require("path");
const fs = require("fs");
const ModelSchema = require("../schema/model.schema");
const CarSchema = require("../schema/car.schema");

const getAllModels = async (req, res, next) => {
  try {
    // const Models = await ModelSchema.find().populate("authorInfo");

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "createdAt";
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    const query = {};

    if (search.trim()) {
      query.fullName = { $regex: search, $options: "i" };
    }

    const total = await ModelSchema.countDocuments(query);

    const models = await ModelSchema.find()
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      total: Math.ceil(total / limit),
      prev: page > 1 ? { page: page - 1, limit } : undefined,
      next: total > page * limit ? { page: page + 1 } : undefined,
      data: models,
    });

    // res.status(200).json(Models);
  } catch (error) {
    next(error);
  }
};

const getOneModel = async (req, res, next) => {
  try {
    // const {title, pages, publishedYear, publishedHome, description, period, imageUrl} = req.body
    const { id } = req.params;

    const foundedModel = await ModelSchema.findById(id)

    if (!foundedModel) {
      throw CustomErrorhandler.NotFound("Not found");
    }

    const reccomendation = await CarSchema.find({
      model: foundedModel.model,
    });

    res.status(200).json({
      foundedModel,
      reccomendation,
    });
  } catch (error) {
    next(error);
  }
};

const addModel = async (req, res, next) => {
  try {
    const {
      model,
      modelImage,
      
    } = req.body;

    const exists = await ModelSchema.findOne({ model });

    if (exists) {
      throw CustomErrorhandler.BadRequest("Bunday model allaqachon mavjud");
    }

    await ModelSchema.create({
      model,
      modelImage,
      
    });

    res.status(201).json({
      message: "Added new Model",
    });
  } catch (error) {
    next(error);
  }
};

const updateModel = async (req, res, next) => {
  try {
    const {
      model,
      modelImage,
    } = req.body;
    const { id } = req.params;

    const foundedModel = await ModelSchema.findById(id);

    if (!foundedModel) {
      throw CustomErrorhandler.NotFound("Not found");
    }

    await ModelSchema.findByIdAndUpdate(id, {
      model,
      modelImage,
    });

    res.status(200).json({
      message: "Updated Model",
    });
  } catch (error) {
    next(error);
  }
};

const deleteModel = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundedModel = await ModelSchema.findById(id);

    if (!foundedModel) {
      throw CustomErrorhandler.NotFound("Not found");
    }

    await ModelSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "Deleted Model",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllModels,
  getOneModel,
  addModel,
  updateModel,
  deleteModel,
};
