const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const isCustomAuth = token.length < 500
    let decodedData
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test")
      req.userId = decodedData?.email
    } else {
      decodedData = jwt.decode(token)
      req.userId = decodedData?.email
    }
    next()
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

module.exports = auth
