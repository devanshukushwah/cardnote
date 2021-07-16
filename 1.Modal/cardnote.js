const mongoose = require("mongoose")
const folderSchema = new mongoose.Schema({
  parent: { type: String, required: true, default: "homepage" },
  title: { type: String, required: true },
  trash: { type: Boolean, required: true, default: false },
  directoryPath: {
    type: Array,
    required: true,
    default: [{ title: "Homepage", page: "homepage" }],
  },
  createdtime: { type: Date, required: true, default: Date.now },
  editedtime: { type: Date, required: true, default: Date.now },
})
const cardSchema = new mongoose.Schema({
  parent: { type: String, required: true, default: "homepage" },
  title: { type: String, required: true },
  data: { type: String, required: true },
  trash: { type: Boolean, required: true, default: false },
  createdtime: { type: Date, required: true, default: Date.now },
  editedtime: { type: Date, required: true, default: Date.now },
})

const folders = (USER) => mongoose.model("folders", folderSchema, `${USER}-F`)
const cards = (USER) => mongoose.model("cards", cardSchema, `${USER}-C`)

module.exports = { folders, cards }
