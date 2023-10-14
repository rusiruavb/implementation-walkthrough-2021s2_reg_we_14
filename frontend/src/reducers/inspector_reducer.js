import {
  CREATE_INSPECTOR,
  GET_INSPECTOR_BYID,
  GET_ALL_INSPECTORS,
  UPDATE_INSPECTOR,
  DELETE_INSPECTOR,
  SET_INSPECTOR,
} from "../actions";

const INITIALSTATE = {
  createinspectors: "",
  getallinspectors: " ",
  getinspectorbyid: [],
  updateinspector: "",
  deleteinspector: "",
  setinspector: "",
  createinspectorserror: null,
  getallinspectorserror: null,
  getinspectorbyiderror: null,
  updateinspectorerror: null,
  deleteinspectorerror: null,
};

function inspectorReducer(state = INITIALSTATE, action) {
  let createinspectors,
    getallinspectors,
    getinspectorbyid,
    updateinspector,
    deleteinspector,
    setinspector;

  switch (action.type) {
    case `${CREATE_INSPECTOR}_PENDING`:
    case `${GET_ALL_INSPECTORS}_PENDING`:
    case `${GET_INSPECTOR_BYID}_PENDING`:
    case `${UPDATE_INSPECTOR}_PENDING`:
    case `${DELETE_INSPECTOR}_PENDING`:
      return {
        ...state,
        loading: true,
        createinspectorserror: null,
        getallinspectorserror: null,
        getinspectorbyiderror: null,
        updateinspectorerror: null,
        deleteinspectorerror: null,
      };
    case `${CREATE_INSPECTOR}_FULFILLED`:
      createinspectors = action.payload.data.data;
      return { ...state, loading: false, createinspectors };
    case `${GET_ALL_INSPECTORS}_FULFILLED`:
      getallinspectors = action.payload.data.data;
      return { ...state, loading: false, getallinspectors };
    case `${GET_INSPECTOR_BYID}_FULFILLED`:
      getinspectorbyid = action.payload.data.data;
      return { ...state, loading: false, getinspectorbyid };
    case `${UPDATE_INSPECTOR}_FULFILLED`:
      updateinspector = action.payload.data.data;
      return { ...state, loading: false, updateinspector };
    case `${DELETE_INSPECTOR}_FULFILLED`:
      deleteinspector = action.payload.data.data;
      return { ...state, loading: false, deleteinspector };
    case `${SET_INSPECTOR}`:
      setinspector = action.payload;
      return { ...state, loading: false, setinspector };

    case `${CREATE_INSPECTOR}_REJECTED`:
      return {
        ...state,
        loading: false,
        createinspectorserror: action.payload,
        state: INITIALSTATE,
      };
    case `${GET_ALL_INSPECTORS}_REJECTED`:
      return {
        ...state,
        loading: false,
        getallinspectorserror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${GET_INSPECTOR_BYID}_REJECTED`:
      return {
        ...state,
        loading: false,
        getinspectorbyiderror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${UPDATE_INSPECTOR}_REJECTED`:
      return {
        ...state,
        loading: false,
        updateinspectorerror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${DELETE_INSPECTOR}_REJECTED`:
      return {
        ...state,
        loading: false,
        deleteinspectorerror: action.payload.data,
        state: INITIALSTATE,
      };

    default:
      return state;
  }
}

export default inspectorReducer;
