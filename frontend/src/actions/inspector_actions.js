import axios from "axios";
import {
  CREATE_INSPECTOR,
  GET_ALL_INSPECTORS,
  GET_INSPECTOR_BYID,
  DELETE_INSPECTOR,
  SET_INSPECTOR,
  UPDATE_INSPECTOR,
} from "./index";

export function setInspector(inspectorData) {
  return {
    type: SET_INSPECTOR,
    payload: inspectorData,
  };
}
export function createInspector(inspectorData) {
  return {
    type: CREATE_INSPECTOR,
    payload: axios.post(
      `${process.env.REACT_APP_API_DEV_URL}/inspector/create/`,
      inspectorData,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    ),
  };
}

export function getAllInspectors() {
  return {
    type: GET_ALL_INSPECTORS,
    payload: axios.get(`${process.env.REACT_APP_API_DEV_URL}/inspector/get`, {
      headers: { Authorization: localStorage.getItem("token") },
    }),
  };
}

export function getInspectorById(inspectorID) {
  return {
    type: GET_INSPECTOR_BYID,
    payload: axios.get(
      `${process.env.REACT_APP_API_DEV_URL}/inspector/${inspectorID}`,
      { headers: { Authorization: localStorage.getItem("token") } }
    ),
  };
}

export function updaetInspectors(inspectorData) {
  return {
    type: UPDATE_INSPECTOR,
    payload: axios.put(
      `${process.env.REACT_APP_API_DEV_URL}/inspector/update/${inspectorData.id}`,
      inspectorData,
      { headers: { Authorization: localStorage.getItem("token") } }
    ),
  };
}

export function deletInspector(inspectorData) {
  return {
    type: DELETE_INSPECTOR,
    payload: axios.delete(
      `${process.env.REACT_APP_API_DEV_URL}/inspector/remove/${inspectorData}`,
      { headers: { Authorization: localStorage.getItem("token") } }
    ),
  };
}
