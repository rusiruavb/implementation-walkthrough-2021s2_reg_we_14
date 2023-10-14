import request from 'supertest';
import app from '../app';
import User from '../models/user_model';

let authToken;

test('Create New User', async () => {
  await request(app).post('/passenger/create')
  .send({
    firstName: "Test First Name",
    lastName: "Test Last Name",
    email: "testuser@gmail.com",
    phoneNumber: "0776621324",
    role: "MANAGER",
    nic: "9878567899V",
    password: "test"
  })
  .expect(201)
  .then((response) => {
    authToken = response.body.token;
    expect(response.body.email).toBe("testuser@gmail.com")
    expect(response.body.role).toBe("MANAGER")
    expect(typeof response.body.token).toBe("string")
    expect(typeof response.body.user_id).toBe("string")
  })
});

test('Login User', async () => {
  await request(app).post('/passenger/login')
  .send({
    email: "testuser@gmail.com",
    password: "test"
  })
  .expect(201)
  .then((response) => {
    authToken = response.body.token;
    expect(response.body.email).toBe("testuser@gmail.com")
    expect(response.body.role).toBe("MANAGER")
    expect(typeof response.body.token).toBe("string")
    expect(typeof response.body.user_id).toBe("string")
  })
});

test('Update User', async () => {
  await request(app).put('/passenger/update')
  .send({
    firstName: "Test First Name - Update",
    lastName: "Test Last Name - Update",
  })
  .set('Authorization', authToken)
  .expect(201)
});

test('Remove User', async () => {
  await request(app).delete('/passenger/remove')
  .set('Authorization', authToken)
  .expect(201);
});
