import axios from "axios";
import {
  CREATE_TRIP,
  GET_ALL_TRIPS,
  GET_TRIP,
  REMOVE_TRIP,
  SET_TRIP,
  UPDATE_TRIP,
} from "./index";

export function setTrip(tripData) {
  return {
    type: SET_TRIP,
    payload: tripData,
  };
}
export function createTrip(tripData) {
  return {
    type: CREATE_TRIP,
    payload: axios.post(
      `${process.env.REACT_APP_API_DEV_URL}/trip/add/`,
      tripData,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    ),
  };
}

export function getAllTrips() {
  return {
    type: GET_ALL_TRIPS,
    payload: axios.get(`${process.env.REACT_APP_API_DEV_URL}/trip/`, {
      headers: { Authorization: localStorage.getItem("token") },
    }),
  };
}

export function getTripById(tripId) {
  return {
    type: GET_TRIP,
    payload: axios.get(`${process.env.REACT_APP_API_DEV_URL}/trip/${tripId}`, {
      headers: { Authorization: localStorage.getItem("token") },
    }),
  };
}

export function updateTrip(tripData) {
  return {
    type: UPDATE_TRIP,
    payload: axios.put(
      `${process.env.REACT_APP_API_DEV_URL}/trip/update/${tripData.id}`,
      tripData,
      { headers: { Authorization: localStorage.getItem("token") } }
    ),
  };
}

export function deleteTrip(tripData) {
  return {
    type: REMOVE_TRIP,
    payload: axios.delete(
      `${process.env.REACT_APP_API_DEV_URL}/trip/delete/${tripData}`,
      { headers: { Authorization: localStorage.getItem("token") } }
    ),
  };
}
