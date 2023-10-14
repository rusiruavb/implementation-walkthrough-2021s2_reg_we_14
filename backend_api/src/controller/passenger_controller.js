import UserController from './user_controller';
import ResponseHandler from '../lib/response_handler';
import LOGGER from '../log/logger';
import StripeConfig from '../config/stripe_config';
import User from '../models/user_model';
import PassCard from '../models/pass_card_model';
import {v4 as uuidv4} from 'uuid';
import node_cron from 'node-cron';
import { ENUM_ACCESS_DENIED, ENUM_CODE_GENERATE, ENUM_INCOMPLETE_PAYMENT_DATA, 
  ENUM_PASS_CARD, ENUM_PAYMENT_METHOD, ENUM_ROLE, ENUM_STRIPE, ENUM_STRIPE_CUSTOMER, 
  ENUM_STRIPE_PAYMENT } from '../lib/response_messages';
import DayPassCard from '../models/daypass_model';
import { ObjectId } from 'bson';
import WalletController from './digitalwallet_controller';

class PassengerController extends UserController {
  static async pay(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.PASSENGER || req.user.role === ENUM_ROLE.FOREIGN_PASSENGER) {

    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  static async createSmartCard(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.PASSENGER) {
      const { cardNumber, expireMonth, expireYear, cvc, amount, packageName } = req.body;

      if (cardNumber && expireMonth && expireYear && cvc && amount) {
        const SecurityCode = PassengerController.generateSecurityCode();
        const CardNumber = PassengerController.generateCardNumber();

        if (SecurityCode && CardNumber) {
          const digitalWallet = new WalletController(amount, req.user._id);
          const walletData = await digitalWallet.createDigitalWallet();

          if (walletData._id) {
            const smartCard = {
              packageName: packageName,
              digitalWalletId: walletData._id,
              cardNumber: CardNumber,
              securityNumber: SecurityCode,
              passengerId: req.user._id,
              cardType: ENUM_PASS_CARD.SMART_CARD,
            };
            const smartCardObj = new PassCard(smartCard);
            await smartCardObj.save().then((data) => {
              const responseData = { data, walletData };
              LOGGER.info(ENUM_PASS_CARD.CREATE_SUCCESS);
              return ResponseHandler.sendSuccessRespond(res, responseData);
            }).catch((error) => {
              LOGGER.error(error.message);
              return ResponseHandler.sendErrorRespond(res, error.message);
            });
          } else {
            LOGGER.error(walletData);
            return ResponseHandler.sendSuccessRespond(res, walletData);
          }
        } else {
          LOGGER.error(ENUM_CODE_GENERATE.FAIL);
          return ResponseHandler.sendErrorRespond(res, ENUM_CODE_GENERATE.FAIL);
        }
      } else {
        LOGGER.error(ENUM_INCOMPLETE_PAYMENT_DATA);
        return ResponseHandler.sendErrorRespond(
          res,
          ENUM_INCOMPLETE_PAYMENT_DATA
        );
      }
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  static async getSmartCard(req, res) {
    if (req.user) {
      const smartCard = await PassCard.findOne({ passengerId: req.user._id })
        .populate({
          path: "digitalWalletId",
          select: "initialAmount availableAmount isLoan",
          populate: { path: "reload", select: "amount createdAt" },
        })
        .populate({
          path: "digitalWalletId",
          populate: { path: "loan", model: "Loan", select: "loanAmount" },
        });

      LOGGER.info(ENUM_PASS_CARD.FETCH_SUCCESS);
      return ResponseHandler.sendSuccessRespond(res, smartCard);
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  static async createDayPass(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.PASSENGER) {
      const amount = req.body.amount;
      const dayPassData = {
        amount: amount,
        passengerId: req.user._id,
      };

      const dayPass = new DayPassCard(dayPassData);
      dayPass.save().then((doc) => {
        LOGGER.info(ENUM_PASS_CARD.CREATE_SUCCESS);
        return ResponseHandler.sendSuccessRespond(res, doc);
      }).catch((error) => {
        LOGGER.error(error.message);
        return ResponseHandler.sendErrorRespond(res, error.message);
      });
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  static async getDayPass(req, res) {
    
  }

  static generateSecurityCode() {
    return ObjectId().toString().toUpperCase();
  }

  static generateCardNumber() {
    const cardNumber = uuidv4();
    return cardNumber.substring(0, 10).toUpperCase();
  }
}

export default PassengerController;
