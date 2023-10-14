import { CREATE_PASSENGER } from "../actions";

const INITIALSTATE = {
  createsigupuser: "",
  createsigupusererror: null,
};

function passengerReducer(state = INITIALSTATE, action) {
  let createsigupuser;

  switch (action.type) {
    case `${CREATE_PASSENGER}_PENDING`:
      return {
        ...state,
        loading: true,
        createsigupusererror: null,
      };
    case `${CREATE_PASSENGER}_FULFILLED`:
      createsigupuser = action.payload.data.data;
      return { ...state, loading: false, createsigupuser };

    case `${CREATE_PASSENGER}_REJECTED`:
      return {
        ...state,
        loading: false,
        createsigupusererror: action.payload,
        state: INITIALSTATE,
      };

    default:
      return state;
  }
}

export default passengerReducer;
