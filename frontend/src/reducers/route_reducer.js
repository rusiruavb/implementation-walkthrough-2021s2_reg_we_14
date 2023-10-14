import {
  CREATE_ROUTE,
  GET_ALL_ROUTES,
  GET_ROUTE_BY_ID,
  UPDATE_ROUTE,
  REMOVE_ROUTE,
  SET_ROUTE,
} from "../actions";

const INITIALSTATE = {
  createroute: "",
  getallroutes: " ",
  getroute: [],
  updateroute: "",
  deleteroute: "",
  setroute: "",
  createrouteerror: null,
  getallrouteserror: null,
  getrouteerror: null,
  updaterouteerror: null,
  deleterouteerror: null,
};

function routeReducer(state = INITIALSTATE, action) {
  let createroute, getallroutes, getroute, setroute, updateroute, deleteroute;

  switch (action.type) {
    case `${CREATE_ROUTE}_PENDING`:
    case `${GET_ALL_ROUTES}_PENDING`:
    case `${GET_ROUTE_BY_ID}_PENDING`:
    case `${UPDATE_ROUTE}_PENDING`:
    case `${REMOVE_ROUTE}_PENDING`:
      return {
        ...state,
        loading: true,
        createrouteerror: null,
        getallrouteserror: null,
        getrouteerror: null,
        updaterouteerror: null,
        deleterouteerror: null,
      };
    case `${CREATE_ROUTE}_FULFILLED`:
      createroute = action.payload.data.data;
      return { ...state, loading: false, createroute };
    case `${GET_ALL_ROUTES}_FULFILLED`:
      getallroutes = action.payload.data.data;
      return { ...state, loading: false, getallroutes };
    case `${GET_ROUTE_BY_ID}_FULFILLED`:
      getroute = action.payload.data.data;
      return { ...state, loading: false, getroute };
    case `${UPDATE_ROUTE}_FULFILLED`:
      updateroute = action.payload.data.data;
      return { ...state, loading: false, updateroute };
    case `${REMOVE_ROUTE}_FULFILLED`:
      deleteroute = action.payload.data.data;
      return { ...state, loading: false, deleteroute };
    case `${SET_ROUTE}`:
      setroute = action.payload;
      return { ...state, loading: false, setroute };

    case `${CREATE_ROUTE}_REJECTED`:
      return {
        ...state,
        loading: false,
        createrouteerror: action.payload,
        state: INITIALSTATE,
      };
    case `${GET_ALL_ROUTES}_REJECTED`:
      return {
        ...state,
        loading: false,
        getallrouteserror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${GET_ROUTE_BY_ID}_REJECTED`:
      return {
        ...state,
        loading: false,
        getrouteerror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${UPDATE_ROUTE}_REJECTED`:
      return {
        ...state,
        loading: false,
        updaterouteerror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${REMOVE_ROUTE}_REJECTED`:
      return {
        ...state,
        loading: false,
        deleterouteerror: action.payload.data,
        state: INITIALSTATE,
      };

    default:
      return state;
  }
}

export default routeReducer;
