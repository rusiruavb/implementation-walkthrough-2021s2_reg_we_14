import ResponseHandler from "../lib/response_handler";
import LOGGER from "../log/logger";
import Loan from "../models/loan_model";
import { ENUM_ROLE, ENUM_LOAN, ENUM_DIGITAL_WALLET } from "../lib/response_messages";
import DigitalWallet from '../models/digitalwallet_model';

class LoanController {
  constructor(amount) {
    this.amount = amount;
  }
  
  async createLoan(digitalWalletId) {
    let responseData;
    const loanData = {
      loanAmount: parseFloat(this.amount).toFixed(2),
      digitalWalletId: digitalWalletId,
    };

    const loan = new Loan(loanData);

    await loan.save().then((data) => {
      responseData = data;
    }).catch((error) => {
      responseData = error.message;
      LOGGER.error(error.message);
    });
    return responseData;
  }

  static async getLoanForWallet(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.PASSENGER) {
      await DigitalWallet.findOne({ passengerId: req.user._id }, async function (error, doc) {
        if (error) {
          LOGGER.error(error.message);
          return ResponseHandler.sendErrorRespond(res, error.message);
        } else {
          const loanData = await Loan.findById(doc.loan);
          LOGGER.info(ENUM_DIGITAL_WALLET.FETCH_SUCCESS);
          return ResponseHandler.sendSuccessRespond(res, loanData);
        }
      });
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }
}

export default LoanController;
