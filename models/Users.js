const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  active: { type: Boolean, default: false },
},
{
  timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User