const router = require("express").Router()

const db = require("../models")
// const {makeAnAppointment} = require("../utils")


const appointments = [{
    appointment_id: 1,
    timeslot_id: 1,
    customer_id: 1
}]


router.post("/", async(req,res)=>{

    const custId = req.body.custId
    const timeslotsId = req.body.timeId

    let appointment

    try{
        appointment =  await db.Appointment.create({
            timeslot_id: timeslotsId,
            customer_id: custId
    })
    }catch(err){
        return res.sendStatus(500)
    }
    return res.sendStatus(200)
})

router.get("/", async (req, res)=>{
    return res.json(appointments)
})


// router.post("/", async (req,res) =>{
    
//     const timeId = req.body.timeId
//     const custId = req.body.custId

//     // console.log(timeId)
//     // console.log(custId)

//     const makeAnAppointment = async (req, res, timeId, custId) =>{
 
//         // const maxAppointmentId = Math.max(...appointments.map(o => o.appointment_id))
      
//         // console.log(maxAppointmentId)

//         const maxAppointmentObject = appointments.reduce((prev, current) => {
//             return (prev.appointment_id > current.appointment_id) ? prev : current;
//         });
//         console.log(maxAppointmentObject)
//         const maxAppointmentId = maxAppointmentObject.appointment_id

//         // console.log(maxAppointmentId)

//         appointments.push({appointment_id: maxAppointmentId + 1, timeslot_id: timeId, customer_id: custId})
    
//         // console.log(appointments)
//     }

//     if(!timeId){
//         return res.sendStatus(404)
//     }
    
//     if(!custId){
//         return res.sendStatus(404)
//     }

//     try{
//         await makeAnAppointment(req,res,timeId,custId)

//     }catch(err){
//         return res.sendStatus(500)
//     }
//     console.log(appointments)
//     return res.sendStatus(200)

// })


module.exports = router