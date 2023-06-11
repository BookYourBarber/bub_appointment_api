const router = require("express").Router()

const db = require("../models")

//create an appointment
router.post("/", async(req,res)=>{

    const customer_id = req.body.customer_id
    const timeslot_id = req.body.timeslot_id

    if(!customer_id){
        return res.sendStatus(400)
    }
    if(!timeslot_id){
        return res.sendStatus(400)
    }

    let appointment

    try{
        appointment =  await db.Appointment.create({
            timeslot_id: timeslot_id,
            customer_id: customer_id
    })
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
    return res.sendStatus(200)
})

//get appointment by appointmentId
router.get("/:id", async (req, res)=>{

    const id = req.params.id
    let appointment;

    try {
        appointment = await db.Appointment.findByPk(id);
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }

    return res.json(appointment)
})

//get all appointments by userId
router.get("/", async (req, res) => {
    const userId = req.query.userId;

    let appointments;
    let queryOptions = {}

    if(userId){
        queryOptions.where = { customer_id: userId }
    }

    try{
        appointments = await db.Appointment.findAll(queryOptions)
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }

    return res.json(appointments)
})

router.delete("/", async(req,res)=>{
    const id = req.body.id;

    let appointment
    try{
        appointment = await db.Appointment.destroy({
            where: {
                id: id
            }
        })
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
    return res.sendStatus(200)
})

module.exports = router