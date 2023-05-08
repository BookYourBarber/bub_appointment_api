const router = require("express").Router()

router.get("/", async (req,res) =>{
    
    const appointment = {
        Time: 12312,
        Name: "sdads"
    }

    // const appointmentTime = appointment.Time

    return res.json(appointment)
})


module.exports = router