import ResponseHandler from "../lib/response_handler";
import LOGGER from "../log/logger";
import ReloadLocation from "../models/reloadlocation_model";
import { ENUM_ROLE, ENUM_RELOAD_Location, ENUM_ACCESS_DENIED } from "../lib/response_messages";

class ReloadLocationController {

  static async calculateDistance(req, res) {}

  static async createReloadLocation(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.MANAGER) {
      const reloadLocationData = {
        name: req.body.name,
        location: req.body.location,
        city: req.body.city,
        distance: req.body.distance,
      };

      const reloadLocation = new ReloadLocation(reloadLocationData);
      const data = await reloadLocation.save();

      if (data) {
        LOGGER.info(ENUM_RELOAD_Location.CREATE_SUCCESS);
        return ResponseHandler.sendSuccessRespond(res, data);
      } else {
        LOGGER.error(ENUM_RELOAD_Location.CREATE_FAIL);
        return ResponseHandler.sendErrorRespond(res, ENUM_RELOAD_Location.CREATE_FAIL);
      }
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  static async getReloadLocations(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.PASSENGER || req.user.role === ENUM_ROLE.FOREIGN_PASSENGER) {
      const reloadLocations = await ReloadLocation.find({})
      
      if (reloadLocations) {
        LOGGER.info(ENUM_RELOAD_Location.GET_SUCCESS);
        return ResponseHandler.sendSuccessRespond(res, reloadLocations);
      } else {
        LOGGER.error(ENUM_RELOAD_Location.GET_FAIL);
        return ResponseHandler.sendErrorRespond(res, ENUM_RELOAD_Location.GET_FAIL);
      }
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  static async updateReloadLocations(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.MANAGER) {

      const reloadLocationData = {
        name: req.body.name,
        location: req.body.location,
        city: req.body.city,
        distance: req.body.distance,
      };

      await ReloadLocation.findByIdAndUpdate(req.body.reloadLocationId, reloadLocationData, function(error, docs) {
        if (error) {
          LOGGER.error(ENUM_RELOAD_Location.UPDATE_FAIL);
          return ResponseHandler.sendErrorRespond(res, error.message);
        } else {
          LOGGER.info(ENUM_RELOAD_Location.UPDATE_SUCCESS);
          return ResponseHandler.sendSuccessRespond(res, docs);
        }
      });
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  static async deleteReloadLocation(req, res) {

    if (req.user && req.user.role === ENUM_ROLE.MANAGER) {

      await ReloadLocation.findByIdAndDelete(req.body._id, function(error, docs) {
        if (error) {
          LOGGER.error(ENUM_RELOAD_Location.DELETE_FAIL);
          return ResponseHandler.sendErrorRespond(res, error.message);
        } else {
          LOGGER.info(ENUM_RELOAD_Location.DELETE_SUCCESS);
          return ResponseHandler.sendSuccessRespond(res, ENUM_RELOAD_Location.DELETE_SUCCESS);
        }
      });
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }

  }

}

export default ReloadLocationController;