import request from 'supertest';
import app from '../app';
import DigitalWallet from '../models/digitalwallet_model';

let authToken;
let passengerId;

test('Login User', async () => {
  await request(app).post('/passenger/login')
  .send({
    email: "testpassenger@gmail.com",
    password: "test"
  })
  .expect(201)
  .then((response) => {
    authToken = response.body.token;
    expect(response.body.email).toBe("testpassenger@gmail.com")
    expect(response.body.role).toBe("PASSENGER")
    expect(typeof response.body.token).toBe("string")
    expect(typeof response.body.user_id).toBe("string")
  })
});

test('Recharge Digital Wallet', async () => {
  await request(app).post('/passenger/wallet/recharge')
  .send({
    amount: 200
  })
  .set('Authorization', authToken)
  .expect(400)
});

afterAll(async () => {
  await DigitalWallet.findOneAndUpdate({ passengerId: passengerId }, { availableAmount: 1000 });
});