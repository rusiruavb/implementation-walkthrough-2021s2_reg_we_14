import { ENUM_STRIPE, ENUM_PAYMENT_METHOD, ENUM_STRIPE_CUSTOMER } from '../lib/response_messages';
import Stripe from 'stripe';
import LOGGER from '../log/logger';
import PassCard from '../models/pass_card_model';
const stripeKey = 'sk_test_51JeJo4JpgjwQtW9Gg24Yl3vqKeSNFa9oFSDLjmp5kx5T3bsWX4csWl0DFcrNgqSrEr5dFhNNusx4lIHRDsolD7Dp00xEh4dZZp';

class StripeConfig {
  static async createPaymentMethod(cardNo, cvc, exp_month, exp_year, customerId) {
    let createTokenResponse;
    if (cardNo && cvc && exp_month && exp_year) {
      const StripeObj = new Stripe(stripeKey);
      await StripeObj.tokens.create({
        card: {
          number: cardNo,
          exp_month: exp_month,
          exp_year: exp_year,
          cvc: cvc,
          currency: 'usd'
        },
      }).then(async (tokenData) => {
        await StripeObj.customers.createSource(customerId, {
          source: tokenData.id
        });
        createTokenResponse = tokenData;
      }).catch((error) => {
        createTokenResponse = error;
      });
      return createTokenResponse;
    } else {
      return ENUM_PAYMENT_METHOD.INCOMPLETE_DATA;
    }
  }

  static async chargeAmount(amount, customerId, accountId) {
    if (amount && customerId) {
      if (parseFloat(amount) >= 100) {
        const paymentAmount = parseInt((parseFloat(amount)) * 100)
        const StripeObj = new Stripe(stripeKey);
        const customer = await StripeObj.customers.retrieve(customerId);
        const passCard = await PassCard.findOne({ passengerId: accountId });
        if (passCard && parseFloat(passCard.amount) >= parseFloat(amount)) {
          const charge = await StripeObj.charges.create({
            amount: paymentAmount,
            currency: 'usd',
            customer: customerId,
            source: customer.default_source
          });
  
          if (charge) {
            await StripeObj.customers.createBalanceTransaction(customerId, {
              amount: -paymentAmount,
              currency: 'usd'
            });
            await PassCard.findByIdAndUpdate(passCard._id, { amount: passCard.amount - amount });
            return charge;
          } else {
            throw new Error(ENUM_STRIPE.PAYMENT_FAIL);
          }
        } else {
          LOGGER.warn(ENUM_STRIPE.INSUFFICIENT_PAYMENT_AMOUNT);
          throw new Error(ENUM_STRIPE.INSUFFICIENT_PAYMENT_AMOUNT + 
            ` Your account balance is USD ${passCard.amount}.00. Requested payment amount is USD ${amount}.00`);
        }
      } else {
        LOGGER.error(ENUM_STRIPE.INSUFFICIENT_AMOUNT);
        throw new Error(ENUM_STRIPE.INSUFFICIENT_AMOUNT);
      }
    } else {
      throw new Error(ENUM_STRIPE.INCOMPLETE_DATA);
    }
  }

  static async createCustomer(user, initialAmount) {
    let customerResponse;
    const balance = parseInt(initialAmount) * 100;
    const StripeObj = new Stripe(stripeKey);
    await StripeObj.customers.create({
      name: user.firstName + user.lastName,
      email: user.email,
      phone: user.mobileNumber,
      balance: balance,
    }).then((customerData) => {
      customerResponse = customerData;
    }).catch((error) => {
      customerResponse = error;
    });

    return customerResponse;
  }

  static async deleteCustomer(customerId) {
    const StripeObj = new Stripe(stripeKey);
    await StripeObj.customers.del(customerId)
    .then((deletedData) => {
      LOGGER.info(ENUM_STRIPE_CUSTOMER.DELETE_SUCCESS);
    })
    .catch((error) => {
      LOGGER.error(error.message);
    });
  }
}

export default StripeConfig;