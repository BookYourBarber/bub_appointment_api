const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())


const appointmentRouter = require("./routers/appointmentRouter")

app.use("/appointments", appointmentRouter)

module.exports = app