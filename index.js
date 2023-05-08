const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())


const appointmentRouter = require("./routers/appointmentRouter")

app.use("/appointments", appointmentRouter)

app.listen(5003, () => {
  console.log('Server started on port 5003');
});
