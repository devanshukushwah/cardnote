const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth.js")
const {
  fetchAll,
  fetchOneDirectory,
  postData,
  deleteElements,
  moveToTrash,
  restoreToTrash,
  renameCard,
  renameFolder,
  fetchAllTrash,
} = require("../3.Functions/cardnote.js")

router.get("/", auth, fetchAll)
router.get("/trash", auth, fetchAllTrash)
router.get("/:parent", auth, fetchOneDirectory)
router.post("/", auth, postData)
router.put("/folder", auth, renameFolder)
router.put("/card", auth, renameCard)
router.delete("/", auth, deleteElements)
router.put("/trash", auth, moveToTrash)
router.put("/restore", auth, restoreToTrash)

module.exports = router
