import {
    GET_ALL_RELOAD_LOCATIONS,
    GET_AVAILABLE_BALANCE
  } from "../actions";
  
  const INITIALSTATE = {
    getalllocations: " ",
    getAvailableBalance: ""
  };
  
  function reloadLocationReducer(state = INITIALSTATE, action) {
    let getalllocations, getAvailableBalance;
  
    switch (action.type) {
      case `${GET_ALL_RELOAD_LOCATIONS}_PENDING`:
        return {
          ...state,
          loading: true,
          getalllocationserror: null,
        };
      case `${GET_ALL_RELOAD_LOCATIONS}_PENDING`:
        return {
          ...state,
          loading: true,
          getAvailableBalanceerror: null,
        };
      case `${GET_ALL_RELOAD_LOCATIONS}_FULFILLED`:
        getalllocations = action.payload.data;
        return { ...state, loading: false, getalllocations };
      case `${GET_AVAILABLE_BALANCE}_FULFILLED`:
        getAvailableBalance = action.payload.data;
        return { ...state, loading: false, getAvailableBalance };
      case `${GET_ALL_RELOAD_LOCATIONS}_REJECTED`:
        return {
          ...state,
          loading: false,
          getallrouteserror: action.payload.data,
          state: INITIALSTATE,
        };
      case `${GET_AVAILABLE_BALANCE}_REJECTED`:
        return {
          ...state,
          loading: false,
          getalllocationserror: action.payload.data,
          state: INITIALSTATE,
        };
      default:
        return state;
    }
  }
  
  export default reloadLocationReducer;
  