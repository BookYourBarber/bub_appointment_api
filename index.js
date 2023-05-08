const express = require('express')

const app = express()

app.use(express.json())


const appointmentRouter = require("./routers/appointmentRouter")

app.use("/appointment", appointmentRouter)

// app.get('/', (req, res) => {
//   res.send('Hello, Wodasdrld!');
// });

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
