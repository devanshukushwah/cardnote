const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cardnoteRoute = require("./2.Routes/cardnote-api.js")
const userRoute = require("./2.Routes/users.js")
const app = express()
const PORT = process.env.PORT || 5000
const DATABASE_URL = "mongodb://localhost:27017/cardnote"
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.DATABASE_URL || DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on("error", (error) => console.log(error))
db.once("open", () => console.log("connected to database"))

app.get("/", (req, res) => {
  res.send("server is running")
})
app.use("/cardnote-api", cardnoteRoute)
app.use("/user", userRoute)

app.listen(PORT, () => console.log(`server is running at port: ${PORT}`))
