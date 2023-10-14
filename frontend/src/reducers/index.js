import { combineReducers } from "redux";
import userReducer from "./user_reducer";
import vehicleReducer from "./vehicle_reducer";
import routeReducer from "./route_reducer";
import tripReducer from "./trip_reducer";
import walletReducer from "./digitalwallet_reducer";
import reloadLocationReducer from "./reload_locations_reducer"
import passengerReducer from "./passenger_reducer";
import inspectorReducer from "./inspector_reducer";

const allReducers = combineReducers({
  userReducer,
  vehicleReducer,
  routeReducer,
  tripReducer,
  walletReducer,
  reloadLocationReducer,
  passengerReducer,
  inspectorReducer,
});

export default allReducers;
