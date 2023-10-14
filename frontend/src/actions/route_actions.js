import axios from "axios";
import {
  CREATE_ROUTE,
  GET_ALL_ROUTES,
  GET_ROUTE_BY_ID,
  REMOVE_ROUTE,
  SET_ROUTE,
  UPDATE_ROUTE,
} from "./index";

export function setRoute(routeData) {
  return {
    type: SET_ROUTE,
    payload: routeData,
  };
}
export function createRoutes(routeData) {
  return {
    type: CREATE_ROUTE,
    payload: axios.post(
      `${process.env.REACT_APP_API_DEV_URL}/route/add/`,
      routeData,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    ),
  };
}

export function getAllRoutes() {
  return {
    type: GET_ALL_ROUTES,
    payload: axios.get(`${process.env.REACT_APP_API_DEV_URL}/route/`, {
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

export function updateRoutes(routeData) {
  return {
    type: UPDATE_ROUTE,
    payload: axios.put(
      `${process.env.REACT_APP_API_DEV_URL}/route/update/${routeData.id}`,
      routeData,
      { headers: { Authorization: localStorage.getItem("token") } }
    ),
  };
}

export function deleteRoute(routeData) {
  return {
    type: REMOVE_ROUTE,
    payload: axios.delete(
      `${process.env.REACT_APP_API_DEV_URL}/route/delete/${routeData}`,
      { headers: { Authorization: localStorage.getItem("token") } }
    ),
  };
}
