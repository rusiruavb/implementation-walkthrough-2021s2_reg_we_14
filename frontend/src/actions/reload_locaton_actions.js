import axios from "axios";
import {
  GET_ALL_RELOAD_LOCATIONS,
  GET_AVAILABLE_BALANCE
} from "./index";

export function getAllReloadLOcations() {
  return {
    type: GET_ALL_RELOAD_LOCATIONS,
    payload: axios.get(`${process.env.REACT_APP_API_DEV_URL}/reloadlocation/all`),
  };
}

export function getAmountBalanceForUser() {
  return {
    type: GET_AVAILABLE_BALANCE,
    payload: axios.get(`${process.env.REACT_APP_API_DEV_URL}/passenger/smartCard/get`, {
      headers: { Authorization: localStorage.getItem("token") },
    }),
  }
}