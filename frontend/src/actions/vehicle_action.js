import axios from "axios";
import {
  CREATE_VEHICLE,
  DELETE_VEHICLE,
  GET_ALL_VEHICLES,
  GET_VEHICLE_BYID,
  SET_VEHICLE,
  UPDATE_VEHICLES,
} from "./index";

export function setVehicle(vehicleData) {
  return {
    type: SET_VEHICLE,
    payload: vehicleData,
  };
}
export function createVehicle(vehicleData) {
  return {
    type: CREATE_VEHICLE,
    payload: axios.post(
      `${process.env.REACT_APP_API_DEV_URL}/vehicle/create`,
      vehicleData,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    ),
  };
}

export function getAllVehicles() {
  return {
    type: GET_ALL_VEHICLES,
    payload: axios.get(`${process.env.REACT_APP_API_DEV_URL}/vehicle/`, {
      headers: { Authorization: localStorage.getItem("token") },
    }),
  };
}

export function getVehicleById(vehicleId) {
  return {
    type: GET_VEHICLE_BYID,
    payload: axios.get(
      `${process.env.REACT_APP_API_DEV_URL}/vehicle/${vehicleId}`,
      { headers: { Authorization: localStorage.getItem("token") } }
    ),
  };
}

export function updateVehicle(vehicleData) {
  return {
    type: UPDATE_VEHICLES,
    payload: axios.put(
      `${process.env.REACT_APP_API_DEV_URL}/vehicle/update/${vehicleData.id}`,
      vehicleData,
      { headers: { Authorization: localStorage.getItem("token") } }
    ),
  };
}

export function deleteVehicle(vehicleData) {
  return {
    type: DELETE_VEHICLE,
    payload: axios.delete(
      `${process.env.REACT_APP_API_DEV_URL}/vehicle/delete/${vehicleData}`,
      { headers: { Authorization: localStorage.getItem("token") } }
    ),
  };
}
