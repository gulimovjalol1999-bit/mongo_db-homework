const CustomErrorhandler = require("../error/custom-error.handler");
const path = require("path");
const fs = require("fs");
const CarSchema = require("../schema/car.schema");

const getAllCars = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "createdAt";
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    const query = {};

    if (search.trim()) {
      query.fullName = { $regex: search, $options: "i" };
    }

    const total = await CarSchema.countDocuments(query);

    const Cars = await CarSchema.find()
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      total: Math.ceil(total / limit),
      prev: page > 1 ? { page: page - 1, limit } : undefined,
      next: total > page * limit ? { page: page + 1 } : undefined,
      data: Cars,
    });

    // res.status(200).json(Cars);
  } catch (error) {
    next(error);
  }
};

const getOneCar = async (req, res, next) => {
  try {
    // const {
    //   title,
    //   model,
    //   imageUrl,
    //   tonirovkasi,
    //   motor,
    //   year,
    //   color,
    //   distance,
    //   gearBook,
    //   description,
    //   umumiyXarajat,
    // } = req.body;
    const { id } = req.params;

    const foundedCar = await CarSchema.findById(id)
    

    if (!foundedCar) {
      throw CustomErrorhandler.NotFound("Not found");
    }

    // const reccomendation = await CarSchema.find({
    //   model: foundedCar.model,
    // });

    res.status(200).json({
      foundedCar,
      // reccomendation,
    });
  } catch (error) {
    next(error);
  }
};

const addCar = async (req, res, next) => {
  try {
    const {
      title,
      model,
      tonirovkasi,
      motor,
      year,
      color,
      distance,
      gearBook,
      description,
      umumiyXarajat,
      owner,
    } = req.body;

    await CarSchema.create({
      title,
      model,
      tonirovkasi,
      motor,
      year,
      color,
      distance,
      gearBook,
      description,
      umumiyXarajat,
    });

    res.status(201).json({
      message: "Added new Car",
    });
  } catch (error) {
    next(error);
  }
};

const updateCar = async (req, res, next) => {
  try {
    const {
      title,
      model,
      tonirovkasi,
      motor,
      year,
      color,
      distance,
      gearBook,
      description,
      umumiyXarajat,
    } = req.body;
    const { id } = req.params;

    const foundedCar = await CarSchema.findById(id);

    if (!foundedCar) {
      throw CustomErrorhandler.NotFound("Not found");
    }

    await CarSchema.findByIdAndUpdate(id, {
      title,
      model,
      tonirovkasi,
      motor,
      year,
      color,
      distance,
      gearBook,
      description,
      umumiyXarajat,
    });

    res.status(200).json({
      message: "Updated Car",
    });
  } catch (error) {
    next(error);
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundedCar = await CarSchema.findById(id);

    if (!foundedCar) {
      throw CustomErrorhandler.NotFound("Not found");
    }

    await CarSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "Deleted Car",
    });
  } catch (error) {
    next(error);
  }
};

const uploadImg = async (req, res, next) => {
  try {
    const { carId } = req.params;

    const foundedCar = await CarSchema.findById(carId);

    if (!foundedCar) {
      throw CustomErrorhandler.NotFound("Not found");
    }

    if (foundedCar.imageUrl) {
      const fileUrl = path.join(__dirname, "..", foundedCar.imageUrl);
    }

    const changer = req.file.path.replace(/\\/, "/");
    foundedCar.imageUrl = changer;
    foundedCar.save();

    res.status(201).json({
      message: changer,
    });
  } catch (error) {
    return res.json(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCars,
  getOneCar,
  addCar,
  updateCar,
  deleteCar,
  uploadImg,
};
