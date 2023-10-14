import UserController from './user_controller';
import { ENUM_ROUTE, ENUM_ROLE, ENUM_ACCESS_DENIED } from '../lib/response_messages';
import ResponseHandler from '../lib/response_handler';
import LOGGER from '../log/logger';
import Route from '../models/route_model';

class InspectorController extends UserController {
  static async validateCustomer(req, res) {
    return ResponseHandler.sendSuccessRespond(res, { message: 'This function need to implement '});
  }

  static async increaseTrespasserCount(req, res) {
    if (req.user && req.user.role === ENUM_ROLE.INSPECTOR) {
      const route = await Route.findById(req.body.id);
      let trespasserCount = route.tesPasserCount;
      trespasserCount += 1;

      await Route.findByIdAndUpdate(req.body.id, { tesPasserCount: trespasserCount }, function(error, docs) {
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
}

export default InspectorController;