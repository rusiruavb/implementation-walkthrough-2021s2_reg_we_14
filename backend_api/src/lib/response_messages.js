export const ENUM_USER_EXIST = "User already exist in the system";
export const ENUM_USER_CREATE = {
  SUCCESS: "Account successfully created",
  FAIL: "Account creation Unsuccessful",
};
export const ENUM_USER_UPDATE = {
  SUCCESS: "Account successfully updated",
  FAIL: "Account update successful",
};
export const ENUM_USER_DELETE = {
  SUCCESS: "User account successfully deleted",
  FAIL: "User account delete fail",
};
export const ENUM_TOKEN_GENERATION = {
  SUCCESS: "Authentication token successfully generated",
  FAIL: "Authentication token generation fail",
};
export const ENUM_ACCOUNT_FETCH = {
  SUCCESS: "User account fetched successfully",
  FAIL: "User account fetched fail",
  NOT_FOUND: "User account not found",
};
export const ENUM_AUTHENTICATION_SUCCESS = "Authentication success";
export const ENUM_LOGIN = {
  SUCCESS: "Login success",
  FAIL: "Login fail, email and password are required",
};
export const ENUM_LOGIN_AUTHENTICATION_NOT_FOUND = "User not found";
export const ENUM_LOGIN_AUTHENTICATION_NOT_MATCHED =
  "Email or password is not match";

export const ENUM_TRIP_EXIST = "Trip already exist in the system";
export const ENUM_INCOMPLETE_TRIP_DATA = 'Incomplete trip information';
export const ENUM_TRIP_CREATE = {
  SUCCESS: " successfully created",
  FAIL: "Trip creation Unsuccessful",
};

export const ENUM_TRIP_FETCH = {
  SUCCESS: "Trips fetched successfully",
  FAIL: "Fetching trips is Unsuccessful",
  NOT_FOUND: "Trips are not Found",
};

export const ENUM_TRIP_UPDATE = {
  SUCCESS: "Trip successfully updated",
  FAIL: "Trip update failed",
};

export const ENUM_TRIP_DELETE = {
  SUCCESS: "Trip account successfully deleted",
  FAIL: "Trip account delete fail",
};
("Email or password is not match");
export const ENUM_ROLE = {
  MANAGER: "MANAGER",
  PASSENGER: "PASSENGER",
  FOREIGN_PASSENGER: "FOREIGN_PASSENGER",
  INSPECTOR: "INSPECTOR",
  DRIVER: "DRIVER",
};
export const ENUM_ACCESS_DENIED = "Access Denied";
export const ENUM_ROUTE_ID_NOT_GENERATED = "Route ID generation fail";
export const ENUM_PARAMETERS_NOT_PASSED = "Necessary parameters are not passed";
export const ENUM_ROUTE = {
  CREATE_SUCCESS: "Route created successfully",
  CREATE_FAIL: "Route creation fail",
  GET_SUCCESS: "Route fetched successfully",
  GET_FAIL: "Route fetch fail",
  UPDATE_SUCCESS: "Route updated successfully",
  UPDATE_FAIL: "Route update fail",
  DELETE_SUCCESS: "Route deleted successfully",
  DELETE_FAIL: "Route delete fail",
};
export const ENUM_VEHICLE = {
  CREATE_SUCCESS: "Vehicle created successfully",
  CREATE_FAIL: "Vehicle creation fail",
  GET_SUCCESS: "Vehicle fetched successfully",
  GET_FAIL: "Vehicle fetch fail",
  UPDATE_SUCCESS: "Vehicle updated successfully",
  UPDATE_FAIL: "Vehicle update fail",
  DELETE_SUCCESS: "Vehicle deleted successfully",
  DELETE_FAIL: "Vehicle delete fail",
};
export const ENUM_WALLET = {
  INITIAL_AMOUNT_REQUIRED: 'Initial amount is required',
  CREATE_SUCCESS: "Digital Wallet created successfully",
  CREATE_FAIL: "Digital Wallet creation fail",
  GET_SUCCESS: "Digital Wallet fetched successfully",
  GET_FAIL: "Digital Wallet fetch fail",
  UPDATE_SUCCESS: "Digital Wallet updated successfully",
  UPDATE_FAIL: "Digital Wallet update fail",
  DELETE_SUCCESS: "Digital Wallet deleted successfully",
  DELETE_FAIL: "Digital Wallet delete fail",
};
export const ENUM_RELOAD = {
  CREATE_SUCCESS: "Successfully Reloaded",
  CREATE_FAIL: "Reloading failed",
  GET_SUCCESS: "Reload Fetched",
  GET_FAIL: "Reload Fetching Failed",
  UPDATE_SUCCESS: "Reload updated",
  UPDATE_FAIL: "Reload update failed",
  DELETE_SUCCESS: "Deleting Reload is successful",
  DELETE_FAIL: "Deleting Reload is Unsuccessful",
};

export const ENUM_LOAN = {
  CREATE_SUCCESS: "Loan created successfully",
  CREATE_FAIL: "Loan Creation Unsuccessful",
  GET_SUCCESS: "Loan fetched successfully",
  GET_FAIL: "Loan fetch failed",
  UPDATE_SUCCESS: "Loan updated successfully",
  UPDATE_FAIL: "Loan update fail",
  DELETE_SUCCESS: "Loan deleted successfully",
  DELETE_FAIL: "Loan delete fail",
};
export const ENUM_INCOMPLETE_PAYMENT_DATA = "Incomplete payment information";
export const ENUM_STRIPE = {
  PAYMENT_SUCCESS: "Payment success",
  PAYMENT_FAIL: "Payment fail",
  INVALID_PAYMENT_TYPE: "Payment type is invalid",
  INSUFFICIENT_PAYMENT_AMOUNT:
    "Cannot proceed with the payment. Credit balance is not sufficient. Take a loan to proceed with the payment.",
  STRIPE_CUSTOMER_ID_REQUIRED: "Stripe customer id is required",
  INCOMPLETE_DATA: "Payment data incomplete",
  INSUFFICIENT_AMOUNT:
    "Amount is not sufficient to make the payment. Minimum amount: Rs.100.00",
};
export const ENUM_PAYMENT_METHOD = {
  INCOMPLETE_DATA: "Payment method data incomplete",
  CREATE_SUCCESS: "Payment method created successfully",
  CREATE_FAIL: "Payment method create fail",
};
export const ENUM_STRIPE_CUSTOMER = {
  INCOMPLETE_DATA: "Stripe user data incomplete",
  CREATE_SUCCESS: "Stripe user created successfully",
  CREATE_FAIL: "Stripe user create fail",
  DELETE_SUCCESS: "Stripe customer account deleted",
  DELETE_FAIL: "Stripe customer account delete fail",
};
export const ENUM_PASS_CARD = {
  CREATE_SUCCESS: "Pass card created successfully",
  CREATE_FAIL: "Pass card creation fail",
  SECURITY_PREFIX: "TG4$$w0rD",
  DAY_PASS: "DAY PASS",
  FETCH_SUCCESS: 'Pass card get successfully',
  SMART_CARD: "SMART CARD",
  EXPIRED: "Pass card has been expired",
  MAKE_PAYMENT_WARNING: "Please make the payment before use the card again.",
  FOREIGN_EXPRESS_PASS: "FOREIGN EXPRESS PASS",
};
export const ENUM_STRIPE_PAYMENT = {
  DAY_PASS_STARTED: "Day pass payment started",
  DAY_PASS_FINISHED: "Day pass payment finished",
  SMART_CARD_STARTED: "Smart card payment started",
  SMART_CARD_FINISHED: "Smart card payment finished",
};
export const ENUM_CODE_GENERATE = {
  SUCCESS: 'Unique codes generated successfully',
  FAIL: 'Code generation fail'
}
export const ENUM_DIGITAL_WALLET = {
  CREATE_SUCCESS: "Digital wallet created successfully",
  CREATE_FAIL: "Digital wallet creation fail",
  RECHARGE_SUCCESS: 'Digital wallet recharge successfully',
  RECHARGE_FAIL: 'Digital wallet recharge fail',
  NOT_FOUND: "Digital wallet is not found",
  LOAN_ALREADY_TAKEN: 'Loan is already taken',
  LOAN_ADD_SUCCESS: 'Loan is added to the wallet successfully',
  LOAN_ADD_FAIL: 'Loan creation fail',
  ELIGIBLE_FOR_LOAN: 'Digital wallet is eligible for loan',
  FETCH_SUCCESS: 'Digital wallet loan fetched successfully',
  AMOUNT_NOT_SUFFICIENT: 'Amount not sufficient.',
  CHARGE_AMOUNT_SUCCESS: 'Successfully charge the amount'
}
export const ENUM_RELOAD_Location = {
  CREATE_SUCCESS: "Successfully Added Reload Location Successfully",
  CREATE_FAIL: "Adding Reload Location failed",
  GET_SUCCESS: "Reload Locations Fetched",
  GET_FAIL: "Reload Locations Fetching Failed",
  UPDATE_SUCCESS: "Reload Location updated",
  UPDATE_FAIL: "Reload Location update failed",
  DELETE_SUCCESS: "Deleting Reload Location is successful",
  DELETE_FAIL: "Deleting Reload Location is Unsuccessful",
};