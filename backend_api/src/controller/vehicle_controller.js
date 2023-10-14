import ResponseHandler from "../lib/response_handler";
import LOGGER from "../log/logger";
import Vehicle from "../models/vehicle_model";
import { ENUM_ROLE, ENUM_VEHICLE } from "../lib/response_messages";


class VehicleController {
  static async create(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.MANAGER) {
      const vehicleData = {
        vehicleId: req.body.vehicleId,
        driver: req.body.driver,
        routeList: req.body.routeList,
        numberOfCoaches: req.body.numberOfCoaches,
        capacityPerCoach: req.body.capacityPerCoach,
        metroCapacity: req.body.metroCapacity,
        numberOfSeats: req.body.numberOfSeats,
        isPublic: req.body.isPublic,
        registrationNumber: req.body.registrationNumber,
        type: req.body.type,
      };

      const vehicle = new Vehicle(vehicleData);
      const data = await vehicle.save();

      if (data) {
        LOGGER.info(ENUM_VEHICLE.CREATE_SUCCESS);
        return ResponseHandler.sendSuccessRespond(res, data);
      } else {
        LOGGER.error(ENUM_VEHICLE.CREATE_FAIL);
        return ResponseHandler.sendErrorRespond(res, ENUM_VEHICLE.CREATE_FAIL);
      }
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  static async createBus(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.MANAGER) {
      const vehicleData = {
        vehicleId: req.body.vehicleId,
        driver: req.body.driver,
        routeList: req.body.routeList,
        numberOfSeats: req.body.numberOfSeats,
        isPublic: req.body.isPublic,
        registrationNumber: req.body.registrationNumber,
        type: req.body.type,
      };

      const vehicle = new Vehicle(vehicleData);
      const data = await vehicle.save();

      if (data) {
        LOGGER.info(ENUM_VEHICLE.CREATE_SUCCESS);
        return ResponseHandler.sendSuccessRespond(res, data);
      } else {
        LOGGER.error(ENUM_VEHICLE.CREATE_FAIL);
        return ResponseHandler.sendErrorRespond(res, ENUM_VEHICLE.CREATE_FAIL);
      }
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  static async createTrain(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.MANAGER) {
      const vehicleData = {
        vehicleId: req.body.vehicleId,
        routeList: req.body.routeList,
        numberOfCoaches: req.body.numberOfCoaches,
        capacityPerCoach: req.body.capacityPerCoach,
        numberOfSeats: req.body.numberOfSeats,
        isPublic: req.body.isPublic,
        registrationNumber: req.body.registrationNumber,
        type: req.body.type,
      };

      const vehicle = new Vehicle(vehicleData);
      const data = await vehicle.save();

      if (data) {
        LOGGER.info(ENUM_VEHICLE.CREATE_SUCCESS);
        return ResponseHandler.sendSuccessRespond(res, data);
      } else {
        LOGGER.error(ENUM_VEHICLE.CREATE_FAIL);
        return ResponseHandler.sendErrorRespond(res, ENUM_VEHICLE.CREATE_FAIL);
      }
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  static async createMetro(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.MANAGER) {
      const vehicleData = {
        vehicleId: req.body.vehicleId,
        routeList: req.body.routeList,
        numberOfCoaches: req.body.numberOfCoaches,
        metroCapacity: req.body.metroCapacity,
        numberOfSeats: req.body.numberOfSeats,
        isPublic: req.body.isPublic,
        registrationNumber: req.body.registrationNumber,
        type: req.body.type,
      };

      const vehicle = new Vehicle(vehicleData);
      const data = await vehicle.save();

      if (data) {
        LOGGER.info(ENUM_VEHICLE.CREATE_SUCCESS);
        return ResponseHandler.sendSuccessRespond(res, data);
      } else {
        LOGGER.error(ENUM_VEHICLE.CREATE_FAIL);
        return ResponseHandler.sendErrorRespond(res, ENUM_VEHICLE.CREATE_FAIL);
      }
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  static async getAllVehicles(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.MANAGER) {
      const vehicles = await Vehicle.find({}).populate(
        "driver",
        "firstName lastName email imageUrl mobileNumber"
      );

      if (vehicles) {
        LOGGER.info(ENUM_VEHICLE.GET_SUCCESS);
        return ResponseHandler.sendSuccessRespond(res, vehicles);
      } else {
        LOGGER.error(ENUM_VEHICLE.GET_FAIL);
        return ResponseHandler.sendErrorRespond(res, ENUM_VEHICLE.GET_FAIL);
      }
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  static async getVehicleById(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.MANAGER) {
      const vehicles = await Vehicle.findById(req.body.vehicleId).populate(
        "driver",
        "firstName lastName email imageUrl mobileNumber"
      );

      if (vehicles) {
        LOGGER.info(ENUM_VEHICLE.GET_SUCCESS);
        return ResponseHandler.sendSuccessRespond(res, vehicles);
      } else {
        LOGGER.error(ENUM_VEHICLE.GET_FAIL);
        return ResponseHandler.sendErrorRespond(res, ENUM_VEHICLE.GET_FAIL);
      }
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  static async updateVehicle(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.MANAGER) {
      const vehicleData = {
        vehicleId: req.body.vehicleId,
        driver: req.body.driver,
        routeList: req.body.routeList,
        numberOfCoaches: req.body.numberOfCoaches,
        capacityPerCoach: req.body.capacityPerCoach,
        metroCapacity: req.body.metroCapacity,
        numberOfSeats: req.body.numberOfSeats,
        isPublic: req.body.isPublic,
        registrationNumber: req.body.registrationNumber,
        type: req.body.type,
      };

      await Vehicle.findByIdAndUpdate(
        req.body.id,
        vehicleData,
        function (error, docs) {
          if (error) {
            LOGGER.error(ENUM_VEHICLE.UPDATE_FAIL);
            return ResponseHandler.sendErrorRespond(res, error.message);
          } else {
            LOGGER.info(ENUM_VEHICLE.UPDATE_SUCCESS);
            return ResponseHandler.sendSuccessRespond(res, docs);
          }
        }
      );
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  static async deleteVehicle(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.MANAGER) {
      await Vehicle.findByIdAndDelete(req.body.id, function (error, docs) {
        if (error) {
          LOGGER.error(ENUM_VEHICLE.DELETE_FAIL);
          return ResponseHandler.sendErrorRespond(res, error.message);
        } else {
          LOGGER.info(ENUM_VEHICLE.DELETE_SUCCESS);
          return ResponseHandler.sendSuccessRespond(
            res,
            ENUM_VEHICLE.DELETE_SUCCESS
          );
        }
      });
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }
}

export default VehicleController;
