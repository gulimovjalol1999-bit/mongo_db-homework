const {Router} = require("express")

const authorization = require("../middleware/authorization")
const carValidatorMiddleware = require("../middleware/car.validator.middleware")
const { getAllCars, getOneCar, addCar, updateCar, deleteCar, uploadImg, getAll, } = require("../controller/car.controller")
const uploadImage = require("../middleware/uploadAvatar")

const carRouter = Router()

carRouter.get("/get_all_cars", getAllCars)
carRouter.get("/get_one_car/:id", getOneCar)
carRouter.post("/add_car", carValidatorMiddleware, authorization, addCar)
carRouter.put("/update_car/:id", authorization, updateCar)
carRouter.delete("/delete_car/:id", authorization, deleteCar)


carRouter.post("/uploadImg/:carId", uploadImage.array("uploadImage", 6), uploadImg)

module.exports = carRouter