import Route from '../models/route_model';
import ResponseHandler from '../lib/response_handler';
import LOGGER from '../log/logger';
import { ENUM_ACCESS_DENIED, ENUM_PARAMETERS_NOT_PASSED, ENUM_ROLE, ENUM_ROUTE, ENUM_ROUTE_ID_NOT_GENERATED, ENUM_TRIP_DELETE } from '../lib/response_messages';
import {v4 as uuidv4} from 'uuid';

class RouteController {
  static async create(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.MANAGER) {
      if (req.body.startLocation && req.body.destination && req.body.distance) {
        const routeId = RouteController.getRouteId(req.body.startLocation, req.body.destination);
        if (routeId) {
          const routeData = {
            routeId: routeId,
            startingLocation: req.body.startLocation,
            destination: req.body.destination,
            distance: req.body.distance,
          };
          const route = new Route(routeData);
          const data = await route.save();

          if (data) {
            LOGGER.info(ENUM_ROUTE.CREATE_SUCCESS);
            return ResponseHandler.sendSuccessRespond(res, data);
          } else {
            LOGGER.error(ENUM_ROUTE.CREATE_FAIL);
            return ResponseHandler.sendErrorRespond(res, ENUM_ROUTE.CREATE_FAIL)
          }
        } else { // if route id not generated
          LOGGER.error(ENUM_ROUTE_ID_NOT_GENERATED);
          return ResponseHandler.sendErrorRespond(res, ENUM_ROUTE_ID_NOT_GENERATED);
        }
      } else { // if necessary parameters not passed
        LOGGER.warn(ENUM_PARAMETERS_NOT_PASSED);
        return ResponseHandler.sendErrorRespond(res, ENUM_PARAMETERS_NOT_PASSED);
      }
    } else { // if user is not valid
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  static async getAllRoutes(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.MANAGER || req.user.role === ENUM_ROLE.INSPECTOR) {
      const routes = await Route.find({});
      
      if (routes && routes.length > 0) {
        LOGGER.info(ENUM_ROUTE.GET_SUCCESS);
        return ResponseHandler.sendSuccessRespond(res, routes);
      } else {
        LOGGER.error(ENUM_ROUTE.GET_FAIL);
        return ResponseHandler.sendErrorRespond(res, ENUM_ROUTE.GET_FAIL);
      }
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  static async getRouteById(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.MANAGER || req.user.role === ENUM_ROLE.INSPECTOR) {
      const routes = await Route.findById({ _id: req.body.id });
      
      if (routes) {
        LOGGER.info(ENUM_ROUTE.GET_SUCCESS);
        return ResponseHandler.sendSuccessRespond(res, routes);
      } else {
        LOGGER.error(ENUM_ROUTE.GET_FAIL);
        return ResponseHandler.sendErrorRespond(res, ENUM_ROUTE.GET_FAIL);
      }
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  static async updateRoute(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.MANAGER) {
      const routeData = {
        startLocation: req.body.startLocation,
        destination: req.body.destination,
        distance: req.body.distance,
      };

      await Route.findByIdAndUpdate(req.body.id, routeData, function(error, docs) {
        if (error) {
          LOGGER.error(ENUM_ROUTE.UPDATE_FAIL);
          return ResponseHandler.sendErrorRespond(res, error.message);
        } else {
          LOGGER.info(ENUM_ROUTE.UPDATE_SUCCESS);
          return ResponseHandler.sendSuccessRespond(res, docs);
        }
      });
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  static async removeRoute(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.MANAGER) {
      await Route.findByIdAndDelete(req.body.id, function (error, docs) {
        if (error) {
          LOGGER.error(error.message);
          return ResponseHandler.sendErrorRespond(res, error.message);
        } else {
          LOGGER.info(ENUM_TRIP_DELETE.SUCCESS);
          return ResponseHandler.sendSuccessRespond(res, docs);
        }
      })
    } else {
      LOGGER.error(ENUM_ACCESS_DENIED);
      return ResponseHandler.sendErrorRespond(res, ENUM_ACCESS_DENIED);
    }
  }

  static getRouteId(startLocation, destination) {
    const startChar = startLocation.charAt(0).toUpperCase();
    const destChar = destination.charAt(0).toUpperCase();
    const customId = uuidv4().substring(0, 5);

    if (startChar && destChar && customId) {
      return startChar + destChar + customId;
    } else {
      return null;
    }
  }
}

export default RouteController;
