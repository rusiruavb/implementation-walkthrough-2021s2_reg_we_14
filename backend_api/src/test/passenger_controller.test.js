import request from 'supertest';
import app from '../app';
import DigitalWallet from '../models/digitalwallet_model';
import PassCard from '../models/pass_card_model';

let authToken;
let smartCardId;
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

test('Create New Smart Card', async () => {
  await request(app).post('/passenger/smartCard/create')
  .send({
    amount: 1000,
    cardNumber: "4242424242424242",
    cvc: "123",
    expireMonth: 10,
    expireYear: 2023,
    packageName: "Silver"
  })
  .set('Authorization', authToken)
  .expect(201)
  .then((response) => {
    expect(response.body.data.cardType).toBe('SMART CARD')
    expect(response.body.data.packageName).toBe('Silver')
    expect(response.body.walletData.initialAmount).toBe(1000)
    expect(response.body.walletData.availableAmount).toBe(1000)
  });
});

test('Get Smart Card', async () => {
  await request(app).get('/passenger/smartCard/get')
  .set('Authorization', authToken)
  .expect(201)
  .then((response) => {
    smartCardId = response.body._id;
    passengerId = response.body.passengerId;
    expect(response.body.cardType).toBe('SMART CARD')
    expect(response.body.packageName).toBe('Silver')
    expect(response.body.digitalWalletId.initialAmount).toBe(1000)
    expect(response.body.digitalWalletId.availableAmount).toBe(1000)
  })
})

afterAll(async () => {
  await PassCard.findByIdAndDelete(smartCardId);
  await DigitalWallet.findOneAndDelete({passengerId: passengerId});
})