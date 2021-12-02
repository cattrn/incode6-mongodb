const mongoose = require('mongoose')
const { Schema } = mongoose

const imageSchema = new Schema({
  url: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" }
},
{
  timestamps: true
})

const Image = mongoose.model("Image", imageSchema)

module.exports = Image