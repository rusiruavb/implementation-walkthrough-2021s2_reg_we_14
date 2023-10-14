import axios from "axios";
import { CREATE_PASSENGER } from "./index";

export function createUserForSignUp(userData) {
  return {
    type: CREATE_PASSENGER,
    payload: axios.post(
      `${process.env.REACT_APP_API_DEV_URL}/signup/`,
      userData,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    ),
  };
}
