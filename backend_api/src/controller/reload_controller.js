import ResponseHandler from "../lib/response_handler";
import LOGGER from "../log/logger";
import Reload from "../models/reload_model";
import { ENUM_ROLE, ENUM_RELOAD } from "../lib/response_messages";

class ReloadController {
  static async create(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.PASSENGER) {
      const reloadData = {
        reloadId: req.body.reloadId,
        amount: req.body.amount,
        date: req.body.date,
        location: req.body.location,
        digitalWallet: req.body.digitalWallet,
      };

      const reload = new Reload(reloadData);
      const data = await reload.save();

      if (data) {
        LOGGER.info(ENUM_RELOAD.CREATE_SUCCESS);
        return ResponseHandler.sendSuccessRespond(res, data);
      } else {
        LOGGER.error(ENUM_RELOAD.CREATE_FAIL);
        return ResponseHandler.sendErrorRespond(res, ENUM_RELOAD.CREATE_FAIL);
      }
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  static async getAllReloads(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.PASSENGER) {
      const reloads = await Reload.find({}).populate(
        "amount",
        "date location digitalWallet"
      );

      if (reloads) {
        LOGGER.info(ENUM_RELOAD.GET_SUCCESS);
        return ResponseHandler.sendSuccessRespond(res, reloads);
      } else {
        LOGGER.error(ENUM_RELOAD.GET_FAIL);
        return ResponseHandler.sendErrorRespond(res, ENUM_RELOAD.GET_FAIL);
      }
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  static async getReloadById(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.PASSENGER) {
      const reload = await Reload.findById(req.body.reloadId).populate(
        "amount",
        "date location digitalWallet"
      );

      if (reload) {
        LOGGER.info(ENUM_RELOAD.GET_SUCCESS);
        return ResponseHandler.sendSuccessRespond(res, reload);
      } else {
        LOGGER.error(ENUM_RELOAD.GET_FAIL);
        return ResponseHandler.sendErrorRespond(res, ENUM_RELOAD.GET_FAIL);
      }
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }
}

export default ReloadController;
