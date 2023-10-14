import {
  CREATE_TRIP,
  GET_ALL_TRIPS,
  GET_TRIP,
  UPDATE_TRIP,
  REMOVE_TRIP,
  SET_TRIP,
} from "../actions";

const INITIALSTATE = {
  createtrip: "",
  getalltrips: " ",
  gettrip: [],
  updatetrip: "",
  removetrip: "",
  settrip: "",
  createtriperror: null,
  getalltripserror: null,
  gettriperror: null,
  updatetriperror: null,
  removetriperror: null,
};

function tripReducer(state = INITIALSTATE, action) {
  let createtrip, getalltrips, gettrip, settrip, updatetrip, removetrip;

  switch (action.type) {
    case `${CREATE_TRIP}_PENDING`:
    case `${GET_ALL_TRIPS}_PENDING`:
    case `${GET_TRIP}_PENDING`:
    case `${UPDATE_TRIP}_PENDING`:
    case `${REMOVE_TRIP}_PENDING`:
      return {
        ...state,
        loading: true,
        createtriperror: null,
        getalltripserror: null,
        gettriperror: null,
        updatetriperror: null,
        removetriperror: null,
      };
    case `${CREATE_TRIP}_FULFILLED`:
      createtrip = action.payload.data.data;
      return { ...state, loading: false, createtrip };
    case `${GET_ALL_TRIPS}_FULFILLED`:
      getalltrips = action.payload.data.data;
      return { ...state, loading: false, getalltrips };
    case `${GET_TRIP}_FULFILLED`:
      gettrip = action.payload.data.data;
      return { ...state, loading: false, gettrip };
    case `${UPDATE_TRIP}_FULFILLED`:
      updatetrip = action.payload.data.data;
      return { ...state, loading: false, updatetrip };
    case `${REMOVE_TRIP}_FULFILLED`:
      removetrip = action.payload.data.data;
      return { ...state, loading: false, removetrip };
    case `${SET_TRIP}`:
      settrip = action.payload;
      return { ...state, loading: false, settrip };

    case `${CREATE_TRIP}_REJECTED`:
      return {
        ...state,
        loading: false,
        createtriperror: action.payload,
        state: INITIALSTATE,
      };
    case `${GET_ALL_TRIPS}_REJECTED`:
      return {
        ...state,
        loading: false,
        getalltripserror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${GET_TRIP}_REJECTED`:
      return {
        ...state,
        loading: false,
        gettriperror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${UPDATE_TRIP}_REJECTED`:
      return {
        ...state,
        loading: false,
        updatetriperror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${REMOVE_TRIP}_REJECTED`:
      return {
        ...state,
        loading: false,
        removetriperror: action.payload.data,
        state: INITIALSTATE,
      };

    default:
      return state;
  }
}

export default tripReducer;
