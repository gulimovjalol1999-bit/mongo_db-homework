const { Schema, model } = require("mongoose");

const Car = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
        enum: {
        values: ["CHEVROLET", "LADA", "LAMBORGHINI", "FERRARI"],
        message: "{VALUE} bunday qiymat qabul qilinmaydi"
      }
    },
    imageUrl: {
      type: String,
      required: false,
    },
    rasmTashqiMakon: {
      type: String,
      required: false,
    },
    rasmIchkiMakon: {
      type: String,
      required: false,
    },
    tonirovkasi: {
      type: Boolean,
      required: true,
    },
    motor: {
      type: String,
      required: true,
    },
    year: {
      type: Date,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
    gearBook: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    umumiyXarajat: {
      type: String,
      required: true,
    },
    owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "owner"
  },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const CarSchema = model("car", Car);

module.exports = CarSchema;
