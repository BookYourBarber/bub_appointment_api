const app = require('../app')
const supertest = require('supertest');
const request = supertest(app)
const db = require('../models/index');

beforeAll(async () => {
  await db.sequelize.authenticate();
  await db.sequelize.sync();
});

beforeEach(async () => {
  await db.sequelize.truncate();
});

describe("Create an appointment", () =>{
  it('should return a status 200 and create an appointment', async () =>{
    
    const payload = {
      "timeslot_id": 2,
      "customer_id": 5
    }

    const response = await request.post("/appointments").send(payload)

    expect(response.statusCode).toBe(200)
  })

  it('invalid body request (timeId)', async () => {
    const payload = {
      "customer_id": 2
    }
    const response = await request.post("/appointments").send(payload)

    expect(response.statusCode).toBe(400)
  })

  it('invalid body request (custId)', async () => {
    const payload = {
      "timeslot_id": 2
    }
    const response = await request.post("/appointments").send(payload)

    expect(response.statusCode).toBe(400)
  })

  it('invalid body request (timeId, custId)', async () => {
    const payload = {
    }
    const response = await request.post("/appointments").send(payload)

    expect(response.statusCode).toBe(400)
  })
})

describe("Get an appointment by id", () => {
  it('should return object of an appointment', async () => {
    // arrange
    const appointment = {
      "timeslot_id": 1,
      "customer_id": 1,
    }

    const dbAppointment = await db.Appointment.create({
      timeslot_id: 1,
      customer_id: 1
    })
    appointment.id = dbAppointment.id

    // act
    const response = await request.get(`/appointments/${appointment.id}`)

    // assert
    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchObject(appointment)
  })
})

describe('Get all appointments', () => {
  it('should return an object of the appointment', async () =>{
    
    const appointment = {
      "timeslot_id": 1,
      "customer_id": 1,
      "createdAt": expect.any(String),
      "updatedAt": expect.any(String)
    }

    const dbAppointment = await db.Appointment.create({
      timeslot_id: 1,
      customer_id: 1
    })
    appointment.id = dbAppointment.id

    const response = await request.get("/appointments")

    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchObject([appointment])
  })

})

describe('Delete the appointment', () => {
  it('should return status 200', async() =>{

    const dbAppointment = await db.Appointment.create({
      timeslot_id: 1,
      customer_id: 1
    })
    const id = dbAppointment.id
    console.log(id)
    const response = await request.delete("/appointments").send({id})
    console.log(response.body)
    expect(response.statusCode).toBe(200)
  })
})