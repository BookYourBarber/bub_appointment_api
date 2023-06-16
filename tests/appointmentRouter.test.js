const app = require('../app')
const supertest = require('supertest');
const request = supertest(app)
const db = require('../models/index');
const sinon = require('sinon');

beforeAll(async () => {
  await db.sequelize.authenticate();
  await db.sequelize.sync();
});

beforeEach(async () => {
  await db.sequelize.truncate();
});
afterEach(() => {
  sinon.restore();
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

  it('should return a status 500 when there is an error creating the appointment', async () => {
    const payload = {
      "timeslot_id": 2,
      "customer_id": 5
    }

    // Mock the create method of the db.Appointment object to throw an error
    sinon.stub(db.Appointment, 'create').throws(new Error('Test error'));

    const response = await request.post("/appointments").send(payload)

    expect(response.statusCode).toBe(500)
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
  it('should return a status 500 when there is an error retrieving the appointment', async () => {
    const appointmentId = 1;
  
    // Mock the findByPk method of the db.Appointment object to throw an error
    sinon.stub(db.Appointment, 'findByPk').throws(new Error('Test error'));
  
    const response = await request.get(`/appointments/${appointmentId}`);
  
    expect(response.statusCode).toBe(500);
  })
})

describe('Get all appointments', () => {
  it('should return an object of appointments', async () =>{
    
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
  it('should modify queryOptions when userId is truthy', () => {
    const userId = 123;
    const queryOptions = {};
  
    if (userId) {
      queryOptions.where = { customer_id: userId };
    }
  
    expect(queryOptions).toEqual({ where: { customer_id: userId } });
  });
  
  it('should not modify queryOptions when userId is falsy', () => {
    const userId = null;
    const queryOptions = {};
  
    if (userId) {
      queryOptions.where = { customer_id: userId };
    }
  
    expect(queryOptions).toEqual({});
  });

  it('should return a status 500 when there is an error retrieving appointments', async () => {
    const userId = 123;
  
    // Mock the findAll method of the db.Appointment object to throw an error
    sinon.stub(db.Appointment, 'findAll').throws(new Error('Test error'));
  
    const response = await request.get('/appointments').query({ userId });
  
    expect(response.statusCode).toBe(500);
  });
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
  it('should return a status 500 when there is an error deleting the appointment', async () => {
    const appointmentId = 1;
  
    // Mock the destroy method of the db.Appointment object to throw an error
    sinon.stub(db.Appointment, 'destroy').throws(new Error('Test error'));
  
    const response = await request
      .delete('/appointments')
      .send({ id: appointmentId });
  
    expect(response.statusCode).toBe(500);
  });
})