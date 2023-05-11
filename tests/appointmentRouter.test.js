const app = require('../app')
const supertest = require('supertest');
const request = supertest(app)

describe("Get an appointment", () =>{
  it('should return a status 200', async () => {
     
    const responseExample = [{
      appointment_id: 1,
      timeslot_id: 1,
      customer_id: 1
    }] 

    const response = await request.get("/appointments")
  
    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchObject(responseExample)
  })
})

describe("Make an appointment", () =>{
  it('should return a status 200', async () =>{

    const payload = {timeId: 1, custId: 1}

    const response = await request.post("/appointments")
    .send(payload)

    expect(response.statusCode).toBe(200)

  })

  it('invalid body request (timeslot_id)', async () => {
    const payload = {custId: 1}

    const response = await request.post("/appointments")
    .send(payload)

    expect(response.statusCode).toBe(404)
  })

  it('invalid body request (customer_id)', async () => {
    const payload = {timeId: 1}

    const response = await request.post("/appointments")
    .send(payload)

    expect(response.statusCode).toBe(404)
  })
})