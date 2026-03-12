const {Router} = require("express")

const authorization = require("../middleware/authorization")
const { getAllModels, getOneModel, addModel, updateModel, deleteModel } = require("../controller/model.controller")
const modelValidatorMiddleware = require("../middleware/model.validator.middleware")

const modelRouter = Router()

modelRouter.get("/get_all_models", getAllModels)
modelRouter.get("/get_one_model/:id", getOneModel)
modelRouter.post("/add_model", modelValidatorMiddleware, authorization, addModel)
modelRouter.put("/update_model/:id", authorization, updateModel)
modelRouter.delete("/delete_model/:id", authorization, deleteModel)



module.exports = modelRouter