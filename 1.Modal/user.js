const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  resetToken: { type: String },
  expireToken: { type: String },
})

const user = mongoose.model("user", userSchema)

module.exports = { user }
