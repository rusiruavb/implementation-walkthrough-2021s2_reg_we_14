import axios from "axios";
import {
  CREATE_WALLET,
  DELETE_WALLET,
  GET_ALL_DIGITALWALLETS,
  GET_ROUTE_BY_ID,
  SET_WALLET,
  UPDATE_ROUTE,
} from "./index";

export function setDigitalWallet(walletData) {
  return {
    type: SET_WALLET,
    payload: walletData,
  };
}
export function createDigitalWallet(walletData) {
  return {
    type: CREATE_WALLET,
    payload: axios.post(
      `${process.env.REACT_APP_API_DEV_URL}/wallet/add/`,
      walletData,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    ),
  };
}

export function getAllDigitalWallets() {
  return {
    type: GET_ALL_DIGITALWALLETS,
    payload: axios.get(`${process.env.REACT_APP_API_DEV_URL}/wallet/`, {
      headers: { Authorization: localStorage.getItem("token") },
    }),
  };
}

export function getRouteById(routeId) {
  return {
    type: GET_ROUTE_BY_ID,
    payload: axios.get(
      `${process.env.REACT_APP_API_DEV_URL}/route/${routeId}`,
      { headers: { Authorization: localStorage.getItem("token") } }
    ),
  };
}

export function updateDigitalWallet(walletData) {
  return {
    type: UPDATE_ROUTE,
    payload: axios.put(
      `${process.env.REACT_APP_API_DEV_URL}/wallet/update/${walletData.id}`,
      walletData,
      { headers: { Authorization: localStorage.getItem("token") } }
    ),
  };
}

export function deletDigitalWallet(walletData) {
  return {
    type: DELETE_WALLET,
    payload: axios.delete(
      `${process.env.REACT_APP_API_DEV_URL}/wallet/delete/${walletData}`,
      { headers: { Authorization: localStorage.getItem("token") } }
    ),
  };
}
