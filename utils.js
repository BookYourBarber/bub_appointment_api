const makeAnAppointment = async (req, res, timeId, custId) =>{

    
    // const maxAppointmentId = Math.max(...appointments.map(o => o.appointment_id))
  
    // console.log(maxAppointmentId)

    const maxAppointmentObject = appointments.reduce((prev, current) => {
        return (prev.appointment_id > current.appointment_id) ? prev : current;
    });

    const maxAppointmentId = maxAppointmentObject.appointment_id

    console.log(maxAppointmentId)

    appointments.push({appointment_id: maxAppointMentId + 1, timeslot_id: timeId, customer_id: custId})

    console.log(appointments)
}

module.exports = {
    makeAnAppointment
}