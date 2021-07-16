const express = require("express")
const router = express.Router()
const {
  signIn,
  signUp,
  resetPassword,
  updatePassword,
} = require("../3.Functions/user.js")

router.post("/signin", signIn)
router.post("/signup", signUp)
router.post("/reset-password", resetPassword)
router.post("/new-password", updatePassword)

module.exports = router
