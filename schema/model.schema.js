const {Schema, model} = require("mongoose")

const Model = new Schema(
  {
    model: {
      type: String,
      required: true,
      unique: true,
      enum: {
      values: ["CHEVROLET", "LADA", "LAMBORGHINI", "FERRARI"],
      message: "{VALUE} bunday qiymat qabul qilinmaydi"
    }
    },
    modelImage: {
      type: String, 
      required: true
    },
    owner: {
  type: Schema.Types.ObjectId,
  ref: "User",
  required: true
}
  },
  { 
    versionKey: false,
    timestamps: true
  }
)

const ModelSchema = model("model", Model)

module.exports = ModelSchema