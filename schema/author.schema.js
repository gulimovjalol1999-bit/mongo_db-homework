const {Schema, model} = require("mongoose")

const Author = new Schema({
  fullName: {
    type: String,
    required: [true, "fullName berilishi shart"],
    minLength: [3, "kamida 3ta harfdan iborat bolishi kerak"],
    maxLength: [50, "ko'pi bilan 50ta harfdan iborat bo'lishi kerak"],
    set: (value) => value.trim(),
    match: /^[a-zA-Z\s]+$/
  },
  birthDate: {
    type: Date,
    required: true
  },
  deathDate: {
    type: String,
    required: true
  },
  period: {
    type: String,
    required: true,
    trim: true,
    enum: {
      values: ["Temuriylar davri", "Sovet davri", "Jadid davri", "Mustaqillik davri"],
      message: "{VALUE} bunday qiymat qabul qilinmaydi"
    }
  },
  bio: {
    type: String,
    required: true
  },
  work: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50
  },
  imageUrl: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return /^\+998\d{2} \d{3} \d{2} \d{2}$/.test(value)
      },
      message: "Phone number: +998XX XXX XX XX shunday formatda bolishi kerak"
    }
  }
}, {
  versionKey: false,
  timestamps: true
})

Author.statics.findByFullName = function(value) {
  return this.find({fullName: value})
}

const AuthorSchema = model("author", Author)
module.exports = AuthorSchema