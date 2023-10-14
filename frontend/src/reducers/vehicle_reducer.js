import {
  CREATE_VEHICLE,
  GET_ALL_VEHICLES,
  GET_VEHICLE_BYID,
  UPDATE_VEHICLES,
  DELETE_VEHICLE,
  SET_VEHICLE,
} from "../actions";

const INITIALSTATE = {
  createvehicle: "",
  getallvehicles: " ",
  getvehicle: [],
  updatevehicle: "",
  deletevehicle: "",
  setvehicle: "",
  createvehicleerror: null,
  getallvehicleserror: null,
  getvehicleerror: null,
  updatevehicleerror: null,
  deletevehicleerror: null,
};

function vehicleReducer(state = INITIALSTATE, action) {
  let createvehicle,
    getallvehicles,
    getvehicle,
    setvehicle,
    updatevehicle,
    deletevehicle;

  switch (action.type) {
    case `${CREATE_VEHICLE}_PENDING`:
    case `${GET_ALL_VEHICLES}_PENDING`:
    case `${GET_VEHICLE_BYID}_PENDING`:
    case `${UPDATE_VEHICLES}_PENDING`:
    case `${DELETE_VEHICLE}_PENDING`:
      return {
        ...state,
        loading: true,
        createvehicleerror: null,
        getallvehicleserror: null,
        getvehicleerror: null,
        updatevehicleerror: null,
        deletevehicleerror: null,
      };
    case `${CREATE_VEHICLE}_FULFILLED`:
      createvehicle = action.payload.data.data;
      return { ...state, loading: false, createvehicle };
    case `${GET_ALL_VEHICLES}_FULFILLED`:
      getallvehicles = action.payload.data.data;
      return { ...state, loading: false, getallvehicles };
    case `${GET_VEHICLE_BYID}_FULFILLED`:
      getvehicle = action.payload.data.data;
      return { ...state, loading: false, getvehicle };
    case `${UPDATE_VEHICLES}_FULFILLED`:
      updatevehicle = action.payload.data.data;
      return { ...state, loading: false, updatevehicle };
    case `${DELETE_VEHICLE}_FULFILLED`:
      deletevehicle = action.payload.data.data;
      return { ...state, loading: false, deletevehicle };
    case `${SET_VEHICLE}`:
      setvehicle = action.payload;
      return { ...state, loading: false, setvehicle };

    case `${CREATE_VEHICLE}_REJECTED`:
      return {
        ...state,
        loading: false,
        createvehicleerror: action.payload,
        state: INITIALSTATE,
      };
    case `${GET_ALL_VEHICLES}_REJECTED`:
      return {
        ...state,
        loading: false,
        getallvehicleserror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${GET_VEHICLE_BYID}_REJECTED`:
      return {
        ...state,
        loading: false,
        getvehicleerror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${UPDATE_VEHICLES}_REJECTED`:
      return {
        ...state,
        loading: false,
        updatevehicleerror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${DELETE_VEHICLE}_REJECTED`:
      return {
        ...state,
        loading: false,
        deletevehicleerror: action.payload.data,
        state: INITIALSTATE,
      };

    default:
      return state;
  }
}

export default vehicleReducer;
