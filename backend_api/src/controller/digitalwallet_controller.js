import ResponseHandler from "../lib/response_handler";
import LOGGER from "../log/logger";
import DigitalWallet from "../models/digitalwallet_model";
import { ENUM_WALLET, ENUM_ROLE, ENUM_ACCESS_DENIED, ENUM_DIGITAL_WALLET } from "../lib/response_messages";
import PassCard from "../models/pass_card_model";
import Reload from '../models/reload_model';
import Loan from '../models/loan_model';
import LoanController from "./loan_controller";

class WalletController {
  constructor(initialAmount, passengerId) {
    this.initialAmount = initialAmount;
    this.passengerId = passengerId;
  }

  async createDigitalWallet() {
    let createResponse; 
    if (this.initialAmount) {
      const digitalWallet = {
        initialAmount: parseFloat(this.initialAmount).toFixed(2),
        availableAmount: parseFloat(this.initialAmount).toFixed(2),
        passengerId: this.passengerId,
      };

      const wallet = new DigitalWallet(digitalWallet);
      await wallet.save().then((data) => {
        createResponse = data;
      }).catch((error) => {
        createResponse = { message: error.message };
      });
      return createResponse;
    } else {
      LOGGER.error(ENUM_WALLET.INITIAL_AMOUNT_REQUIRED);
      throw new Error(ENUM_WALLET.INITIAL_AMOUNT_REQUIRED);
    }
  }

  static async recharge(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.PASSENGER) {
      const passCard = await PassCard.findOne({ passengerId: req.user._id });
      
      if (passCard && passCard.digitalWalletId) {
        const reloadData = {
          amount: parseFloat(req.body.amount).toFixed(2),
          digitalWallet: passCard.digitalWalletId,
        };

        const reload = new Reload(reloadData);
        await reload.save().then(async (reloadInfo) => {
          const digitalWallet = await DigitalWallet.findById(passCard.digitalWalletId);

          if (digitalWallet && digitalWallet._id) {
            digitalWallet.availableAmount += parseFloat(reloadInfo.amount);
            DigitalWallet.findByIdAndUpdate(digitalWallet._id, { 
              availableAmount: digitalWallet.availableAmount, $push: { reload: reloadInfo._id }
            }, function (error, docs) {
              if (error) {
                LOGGER.error(error.message);
                return ResponseHandler.sendErrorRespond(res, error.message);
              } else {
                LOGGER.info(ENUM_DIGITAL_WALLET.RECHARGE_SUCCESS);
                return ResponseHandler.sendSuccessRespond(res, docs);
              }
            });
          } else {
            LOGGER.error(ENUM_DIGITAL_WALLET.NOT_FOUND);
            return ResponseHandler.sendErrorRespond(res, ENUM_DIGITAL_WALLET.NOT_FOUND);
          }
        }).catch((error) => {
          LOGGER.error(error.message);
          return ResponseHandler.sendErrorRespond(res, error.message);
        });
      } else {
        LOGGER.error(ENUM_DIGITAL_WALLET.NOT_FOUND);
        return ResponseHandler.sendErrorRespond(res, ENUM_DIGITAL_WALLET.NOT_FOUND);
      }
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  /**
   * 
   * @param { amount } req 
   * This function use @function validateLoan() to validate whether the digital wallet 
   * is eligible for a loan or not. This function needs to pass the @param digitalWalletId for
   * the @function validateLoan().
   * @returns Loan object
   */
  static async addLoan(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.PASSENGER) {
      const passCard = await PassCard.findOne({ passengerId: req.user._id });

      if (passCard && passCard.digitalWalletId) {
        const IsEligibleForLoan = await WalletController.validateLoan(passCard.digitalWalletId);

        if (IsEligibleForLoan) {
          const loan = new LoanController(req.body.amount);

          loan.createLoan(passCard.digitalWalletId)
          .then(async (loanInfo) => {
            const digitalWallet = await DigitalWallet.findById(passCard.digitalWalletId);

            if (digitalWallet && digitalWallet._id) {
              digitalWallet.availableAmount += parseFloat(loanInfo.loanAmount);
              await DigitalWallet.findByIdAndUpdate(passCard.digitalWalletId, 
                { isLoan: true, loan: loanInfo._id, availableAmount: digitalWallet.availableAmount }, 
                function (error, doc) {
                  if (error) {
                    LOGGER.error(error.message);
                    return ResponseHandler.sendErrorRespond(res, error.message);
                  } else {
                    LOGGER.info(ENUM_DIGITAL_WALLET.LOAN_ADD_SUCCESS);
                    return ResponseHandler.sendSuccessRespond(res, loanInfo);
                  }
                });
            } else {
              LOGGER.error(ENUM_DIGITAL_WALLET.NOT_FOUND);
              return ResponseHandler.sendErrorRespond(res, ENUM_DIGITAL_WALLET.NOT_FOUND);
            }
          }).catch((error) => {
            LOGGER.error(error.message);
            return ResponseHandler.sendErrorRespond(res, error.message);
          })
        } else {  
          return ResponseHandler.sendErrorRespond(res, ENUM_DIGITAL_WALLET.LOAN_ALREADY_TAKEN);
        }
      } else {
        LOGGER.error(ENUM_DIGITAL_WALLET.NOT_FOUND);
        return ResponseHandler.sendErrorRespond(res, ENUM_DIGITAL_WALLET.NOT_FOUND);
      }
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  static async validateLoan(digitalWalletId) {
    let isEligibleToLoan = false;

    await DigitalWallet.findById(digitalWalletId, function (error, doc) {
      if (error) {
        isEligibleToLoan = false;
        LOGGER.error(error.message);
      } else {
        if (doc.isLoan === true) {
          LOGGER.warn(ENUM_DIGITAL_WALLET.LOAN_ALREADY_TAKEN);
          isEligibleToLoan = false;
        } else {
          LOGGER.info(ENUM_DIGITAL_WALLET.ELIGIBLE_FOR_LOAN);
          isEligibleToLoan = true;
        }
      }
    });

    return isEligibleToLoan;
  }

  /**
   * @param { digitalWalletId, amount }
   * This function will first check if the loan is already take or not.
   * If the loan is taken, the deduct the amount from the loan. 
   * If not, charge the amount.
   */
  static async chargeAmount(digitalWalletId, amount) {
    let chargeAmountResponse;
    const chargeAmount = parseFloat(amount).toFixed(2);
    const digitalWallet = await DigitalWallet.findById(digitalWalletId);

    if (digitalWallet && digitalWallet._id) {
      if (chargeAmount <= digitalWallet.availableAmount) {
        digitalWallet.availableAmount -= chargeAmount;
        await DigitalWallet.findByIdAndUpdate(digitalWalletId, { availableAmount: digitalWallet.availableAmount }, 
          function (error, doc) {
            if (error) {
              LOGGER.error(error.message);
              chargeAmountResponse = error.message;
            } else {
              LOGGER.info(ENUM_DIGITAL_WALLET.CHARGE_AMOUNT_SUCCESS);
              chargeAmountResponse = doc;
            }
          });
      } else {
        LOGGER.error(ENUM_DIGITAL_WALLET.AMOUNT_NOT_SUFFICIENT);
        chargeAmountResponse = ENUM_DIGITAL_WALLET.AMOUNT_NOT_SUFFICIENT;
      }
    } else {
      LOGGER.error(ENUM_DIGITAL_WALLET.NOT_FOUND);
      chargeAmountResponse = ENUM_DIGITAL_WALLET.NOT_FOUND;
    }
    return chargeAmountResponse;
  }

  static async removeDigitalWallet(walletId) {
    let deleteResponse;
    await DigitalWallet.findByIdAndDelete(
      walletId,
      function (error, docs) {
        if (error) {
          LOGGER.error(ENUM_WALLET.DELETE_FAIL);
          deleteResponse = error.message;
        } else {
          LOGGER.info(ENUM_WALLET.DELETE_SUCCESS);
          deleteResponse = docs;
        }
      }
    );
    return deleteResponse;
  }
}

export default WalletController;
