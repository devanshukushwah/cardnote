const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const { user } = require("../1.Modal/user.js")
const nodemailer = require("nodemailer")
const sendGridTransport = require("nodemailer-sendgrid-transport")
const {
  DOMAIN_NAME,
  SENDGRID_API_KEY,
  SENDGRID_EMAIL,
} = require("../config/keys")

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: SENDGRID_API_KEY,
    },
  })
)

//

const signIn = async (req, res) => {
  console.log("called sighin")
  const { email, password } = req.body
  try {
    const existingUser = await user.findOne({ email })
    if (!existingUser)
      return res.status(422).json({ message: "user not found" })

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    )

    if (!isPasswordCorrect)
      return res.status(422).json({ message: "password not match" })
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test"
    )
    res.status(200).json({ result: existingUser, token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const signUp = async (req, res) => {
  const { email, password, confirmPassword, firstName } = req.body
  if (password !== confirmPassword)
    return res.status(422).json({ message: "password not match" })

  try {
    const existingUser = await user.findOne({ email })
    if (existingUser)
      return res.status(422).json({ message: "user already exist" })

    const hashedPassword = await bcrypt.hash(password, 12)
    const result = await user.create({
      email,
      password: hashedPassword,
      name: firstName,
    })
    const token = jwt.sign({ email: result.email, id: result._id }, "test")
    res.status(200).json({ result, token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const resetPassword = async (req, res) => {
  try {
    const { email } = req.body
    if (!email) return res.status(400).json({ message: "email is invalid" })
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        console.log(err)
      }
      const token = buffer.toString("hex")
      const checkUser = await user.findOne({ email })
      if (!checkUser)
        return res
          .status(422)
          .json({ message: "No user exist with that email" })
      const updateToken = await user
        .updateOne(
          { email },
          {
            $set: { resetToken: token, expireToken: Date.now() + 3600000 },
          }
        )
        .then((result) => {
          transporter.sendMail({
            to: email,
            from: SENDGRID_EMAIL,
            subject: "password reset || savecardnote",
            html: `
                     <p>You requested for password reset</p>
                     <h5>click in this <a href="${DOMAIN_NAME}/reset/${token}">link</a> to reset password</h5>
                     `,
          })
          res.json({ message: "check your email" })
        })
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const updatePassword = async (req, res) => {
  try {
    const { token, password } = req.body
    const checkToken = await user.findOne({
      resetToken: token,
      expireToken: { $gt: Date.now() },
    })
    if (!checkToken)
      return res.status(422).json({ message: "token is expired" })
    const hashedPassword = await bcrypt.hash(password, 12)
    const updatePassword = await user.updateOne(
      { resetToken: token },
      {
        $set: {
          password: hashedPassword,
          resetToken: undefined,
          expireToken: undefined,
        },
      }
    )
    if (!updatePassword)
      return res.status(422).json({ message: "password not update" })
    res.status(200).json({ message: "password updated" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

module.exports = { signUp, signIn, resetPassword, updatePassword }
