import User from "../models/user_model";
import ResponseHandler from "../lib/response_handler";
import {
  ENUM_ACCOUNT_FETCH,
  ENUM_LOGIN,
  ENUM_LOGIN_AUTHENTICATION_NOT_FOUND,
  ENUM_LOGIN_AUTHENTICATION_NOT_MATCHED,
  ENUM_TOKEN_GENERATION,
  ENUM_USER_CREATE,
  ENUM_USER_DELETE,
  ENUM_USER_EXIST,
  ENUM_USER_UPDATE,
} from "../lib/response_messages";
import LOGGER from "../log/logger";

const USER_PICTURE = {
  MALE: "https://firebasestorage.googleapis.com/v0/b/shopping-storage-22f5f.appspot.com/o/male.jpg?alt=media&token=36491e78-57c7-4869-81bc-f1d3480e6b39",
  FEMALE:
    "https://firebasestorage.googleapis.com/v0/b/shopping-storage-22f5f.appspot.com/o/female.jpg?alt=media&token=d07684cb-d4b4-41bb-bd7a-5080d01394c9",
};

class UserController {
  static async create(req, res) {
    if (req.body) {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        role,
        nic,
        password,
        routeList,
        licenceNumber,
        permitNumber,
      } = req.body;
      let user = await User.findOne({ email: email });

      if (user) {
        LOGGER.error(ENUM_USER_EXIST);
        return ResponseHandler.sendErrorRespond(res, ENUM_USER_EXIST);
      }

      const userObject = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNumber: phoneNumber,
        role: role,
        nic: nic,
        password: password,
        routeList: routeList,
        licenceNumber: licenceNumber,
        permitNumber: permitNumber,
        imageUrl: req.body.imageUrl
          ? req.body.imageUrl
          : req.body.gender === "Male"
          ? USER_PICTURE.MALE
          : USER_PICTURE.FEMALE,
      };

      user = new User(userObject);
      const token = await user.generateAuthToken();

      if (token) {
        LOGGER.info(ENUM_TOKEN_GENERATION.SUCCESS);
        const data = await user.save();

        if (data) {
          const responseData = {
            user_id: user._id,
            email: user.email,
            token: token,
            role: user.role,
          };

          LOGGER.info(ENUM_USER_CREATE.SUCCESS);
          return ResponseHandler.sendSuccessRespond(res, responseData);
        } else {
          LOGGER.error(ENUM_USER_CREATE.FAIL);
          return ResponseHandler.sendErrorRespond(res, ENUM_USER_CREATE.FAIL);
        }
      } else {
        LOGGER.error(ENUM_TOKEN_GENERATION.FAIL);
        return ResponseHandler.sendErrorRespond(
          res,
          ENUM_TOKEN_GENERATION.FAIL
        );
      }
    }
  }

  static async getAccount(req, res) {
    if (req.user) {
      const user = {
        _id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        imageUrl: req.user.imageUrl,
        mobileNumber: req.user.mobileNumber,
        nic: req.user.nic,
        token: req.user.token,
        role: req.user.role,
        routesList: req.user.routesList,
        licenceNumber: req.user.licenceNumber,
        permitNumber: req.user.permitNumber,
      };
      LOGGER.info(ENUM_ACCOUNT_FETCH.SUCCESS);
      return ResponseHandler.sendSuccessRespond(res, user);
    } else {
      LOGGER.error(ENUM_ACCOUNT_FETCH.FAIL);
      return ResponseHandler.sendNotFoundRespond(
        res,
        ENUM_ACCOUNT_FETCH.NOT_FOUND
      );
    }
  }

  static async updateAccount(req, res) {
    if (req.user) {
      const updateData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobileNumber: req.body.phoneNumber,
        nic: req.body.nic,
        role: req.body.role,
        routesList: req.body.routesList,
        licenceNumber: req.body.licenceNumber,
        permitNumber: req.body.permitNumber,
      };

      const user = await User.findByIdAndUpdate(req.user._id, updateData);
      LOGGER.info(ENUM_USER_UPDATE.SUCCESS);
      return ResponseHandler.sendSuccessRespond(res, user);
    } else {
      LOGGER.error(ENUM_ACCOUNT_FETCH.FAIL);
      return ResponseHandler.sendNotFoundRespond(
        res,
        ENUM_ACCOUNT_FETCH.NOT_FOUND
      );
    }
  }

  static async deleteAccount(req, res) {
    if (req.user) {
      const user = await User.findByIdAndDelete(req.user._id);
      LOGGER.info(ENUM_USER_DELETE.SUCCESS);
      return ResponseHandler.sendSuccessRespond(res, user);
    } else {
      LOGGER.error(ENUM_ACCOUNT_FETCH.FAIL);
      return ResponseHandler.sendNotFoundRespond(
        res,
        ENUM_ACCOUNT_FETCH.NOT_FOUND
      );
    }
  }

  static async accountLogin(req, res) {
    if (req.body && req.body.email && req.body.password) {
      const userAuth = await User.findByUsernamePassword(
        req.body.email,
        req.body.password
      );

      if (
        (userAuth && userAuth === ENUM_LOGIN_AUTHENTICATION_NOT_FOUND) ||
        userAuth === ENUM_LOGIN_AUTHENTICATION_NOT_MATCHED
      ) {
        return ResponseHandler.sendNotFoundRespond(res, userAuth);
      } else {
        const token = await userAuth.generateAuthToken();

        if (token) {
          const responseData = {
            user_id: userAuth._id,
            email: userAuth.email,
            token: token,
            role: userAuth.role,
          };

          LOGGER.info(ENUM_LOGIN.SUCCESS);
          return ResponseHandler.sendSuccessRespond(res, responseData);
        } else {
          LOGGER.error(ENUM_TOKEN_GENERATION.FAIL);
          return ResponseHandler.sendErrorRespond(
            res,
            ENUM_TOKEN_GENERATION.FAIL
          );
        }
      }
    } else {
      LOGGER.error(ENUM_LOGIN.FAIL);
      return ResponseHandler.sendErrorRespond(res, ENUM_LOGIN.FAIL);
    }
  }

  static async createPassenger(req, res) {
    if (req.body) {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        role,
        nic,
        password,
        imageUrl,
      } = req.body;
      let user = await User.findOne({ email: email });

      if (user) {
        LOGGER.error(ENUM_USER_EXIST);
        return ResponseHandler.sendErrorRespond(res, ENUM_USER_EXIST);
      }

      const userObject = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNumber: phoneNumber,
        role: role,
        nic: nic,
        password: password,
        imageUrl: req.body.imageUrl
          ? req.body.imageUrl
          : req.body.gender === "Male"
          ? USER_PICTURE.MALE
          : USER_PICTURE.FEMALE,
      };

      user = new User(userObject);
      const token = await user.generateAuthToken();

      if (token) {
        LOGGER.info(ENUM_TOKEN_GENERATION.SUCCESS);
        const data = await user.save();

        if (data) {
          const responseData = {
            user_id: user._id,
            email: user.email,
            token: token,
            role: user.role,
          };

          LOGGER.info(ENUM_USER_CREATE.SUCCESS);
          return ResponseHandler.sendSuccessRespond(res, responseData);
        } else {
          LOGGER.error(ENUM_USER_CREATE.FAIL);
          return ResponseHandler.sendErrorRespond(res, ENUM_USER_CREATE.FAIL);
        }
      } else {
        LOGGER.error(ENUM_TOKEN_GENERATION.FAIL);
        return ResponseHandler.sendErrorRespond(
          res,
          ENUM_TOKEN_GENERATION.FAIL
        );
      }
    }
  }
}

export default UserController;
