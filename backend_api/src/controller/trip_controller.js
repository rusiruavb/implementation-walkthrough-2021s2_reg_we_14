import Trip from "../models/trip_model";
import ResponseHandler from "../lib/response_handler";
import {
  ENUM_TRIP_CREATE,
  ENUM_TRIP_EXIST,
  ENUM_TRIP_FETCH,
  ENUM_TRIP_UPDATE,
  ENUM_TRIP_DELETE,
  ENUM_ROLE,
  ENUM_ACCESS_DENIED,
  ENUM_INCOMPLETE_TRIP_DATA,
} from "../lib/response_messages";
import LOGGER from "../log/logger";

class TripController {
  static async create(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.MANAGER) {
      const { startTime, endTime, pricePerKilometer, route, inspector, vehicle } = req.body;

      if (startTime && endTime && pricePerKilometer && route && inspector && vehicle ) {
        const tripObj = {
          startTime: startTime,
          endTime: endTime,
          pricePerKilometer: pricePerKilometer,
          route: route,
          inspector: inspector,
          vehicle: vehicle,
        };

        const trip = new Trip(tripObj);
        await trip.save()
        .then((tripData) => {
          LOGGER.info(ENUM_TRIP_CREATE.SUCCESS);
          return ResponseHandler.sendSuccessRespond(res, tripData);
        }).catch((error) => {
          LOGGER.error(error.message);
          return ResponseHandler.sendErrorRespond(res, error.message);
        });
      } else {
        LOGGER.error(ENUM_INCOMPLETE_TRIP_DATA);
        return ResponseHandler.sendErrorRespond(res, ENUM_INCOMPLETE_TRIP_DATA);  
      }
    } else {
      LOGGER.warn(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  static async getTrips(req, res) {
    const trips = await Trip.find({})
      .populate({ path: 'route', select: 'startingLocation destination distance'})
      .populate({ path: 'inspector', select: 'firstName lastName email mobileNumber'})
      .populate({ path: 'vehicle', select: 'vehicleId isPublic registrationNumber type numberOfSeats metroCapacity capacityPerCoach numberOfCoaches', 
        populate: { path: 'driver', select: 'firstName lastName email mobileNumber'}
      });

    if (trips.length > 0) {
      LOGGER.info(ENUM_TRIP_FETCH.SUCCESS);
      return ResponseHandler.sendSuccessRespond(res, trips);
    } else {
      LOGGER.error(ENUM_TRIP_FETCH.NOT_FOUND);
      return ResponseHandler.sendErrorRespond(res, ENUM_TRIP_FETCH.NOT_FOUND);
    }
  }

  static async updateTrip(req, res) {
    if (req.trip) {
      const updateData = {
        tripId: req.body.tripId,
        date: req.trip.date,
        distance: req.trip.distance,
        startLocation: req.trip.startLocation,
        destination: req.trip.destination,
        passengers: req.trip.passengers,
        vehicleId: req.trip.vehicleId,
      };

      const trip = await Trip.findByIdAndUpdate(req.trip._id, updateData);
      LOGGER.info(ENUM_TRIP_UPDATE.SUCCESS);
      return ResponseHandler.sendSuccessRespond(res, trip);
    } else {
      LOGGER.error(ENUM_TRIP_FETCH.FAIL);
      return ResponseHandler.sendNotFoundRespond(res, ENUM_TRIP_FETCH.NOT_FOUND);
    }
  }

  static async deleteTrip(req, res) {
    if (req.trip) {
      const trip = await Trip.findByIdAndDelete(req.trip._id);
      LOGGER.info(ENUM_TRIP_DELETE.SUCCESS);
      return ResponseHandler.sendSuccessRespond(res, user);
    } else {
      LOGGER.error(ENUM_ACCOUNT_FETCH.FAIL);
      return ResponseHandler.sendNotFoundRespond(
        res,
        ENUM_ACCOUNT_FETCH.NOT_FOUND
      );
    }
  }

  static async calculateDistance(startLocation, destination) {
    //
  }
}

export default TripController;
