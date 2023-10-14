import request from 'supertest';
import app from '../app';
import User from '../models/user_model';

let authToken;

test('Create New User', async () => {
  await request(app).post('/inspector/create')
  .send({
    firstName: "Test First Name",
    lastName: "Test Last Name",
    email: "testinspector@gmail.com",
    phoneNumber: "0776621324",
    role: "INSPECTOR",
    nic: "9878567899V",
    password: "test"
  })
  .expect(201)
  .then((response) => {
    authToken = response.body.token;
    expect(response.body.email).toBe("testinspector@gmail.com")
    expect(response.body.role).toBe("INSPECTOR")
    expect(typeof response.body.token).toBe("string")
    expect(typeof response.body.user_id).toBe("string")
  })
});

test('Login User', async () => {
  await request(app).post('/inspector/login')
  .send({
    email: "testinspector@gmail.com",
    password: "test"
  })
  .expect(201)
  .then((response) => {
    authToken = response.body.token;
    expect(response.body.email).toBe("testinspector@gmail.com")
    expect(response.body.role).toBe("INSPECTOR")
    expect(typeof response.body.token).toBe("string")
    expect(typeof response.body.user_id).toBe("string")
  })
});

test('Update User', async () => {
  await request(app).put('/inspector/update')
  .send({
    firstName: "Test First Name - Update",
    lastName: "Test Last Name - Update",
  })
  .set('Authorization', authToken)
  .expect(201)
});

test('Remove User', async () => {
  await request(app).delete('/inspector/remove')
  .set('Authorization', authToken)
  .expect(201);
});