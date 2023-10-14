import jwt from 'jsonwebtoken';
import LOGGER from '../log/logger';
import User from '../models/user_model';
import ResponseHandler from '../lib/response_handler';
import { ENUM_AUTHENTICATION_SUCCESS } from '../lib/response_messages';

class AuthController {
  static async authenticate(req, res, next) {
    try {
      const token = req.header('Authorization');
      const decode = jwt.verify(token, 'CSSESecret');
      const user = await User.findOne({
        _id: decode._id,
        token: token,
      });

      if (!user) {
        throw new Error(
          'Error from auth middleware - Please authenticate to the system'
        );
      }

      LOGGER.info(ENUM_AUTHENTICATION_SUCCESS);
      req.token = token;
      req.user = user;
      next();
    } catch (error) {
      LOGGER.error(error.message);
      return ResponseHandler.sendErrorRespond(res, error.message);
    }
  }
}

export default AuthController;
