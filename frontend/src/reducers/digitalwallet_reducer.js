import {
  CREATE_WALLET,
  GET_ALL_DIGITALWALLETS,
  GET_WALLET_BYID,
  UPDATE_WALLET,
  DELETE_WALLET,
  SET_WALLET,
} from "../actions";

const INITIALSTATE = {
  createwallet: "",
  getallwallets: " ",
  getwallet: [],
  updatewallet: "",
  deletewallet: "",
  setwallet: "",
  createwalleterror: null,
  getallwalletserror: null,
  getwalleterror: null,
  updatewalleterror: null,
  deletewalleterror: null,
};

function walletReducer(state = INITIALSTATE, action) {
  let createwallet,
    getallwallets,
    getwallet,
    setwallet,
    updatewallet,
    deletewallet;

  switch (action.type) {
    case `${CREATE_WALLET}_PENDING`:
    case `${GET_ALL_DIGITALWALLETS}_PENDING`:
    case `${GET_WALLET_BYID}_PENDING`:
    case `${UPDATE_WALLET}_PENDING`:
    case `${DELETE_WALLET}_PENDING`:
      return {
        ...state,
        loading: true,
        createwalleterror: null,
        getallwalletserror: null,
        getwalleterror: null,
        updatewalleterror: null,
        deletewalleterror: null,
      };
    case `${CREATE_WALLET}_FULFILLED`:
      createwallet = action.payload.data.data;
      return { ...state, loading: false, createwallet };
    case `${GET_ALL_DIGITALWALLETS}_FULFILLED`:
      getallwallets = action.payload.data.data;
      return { ...state, loading: false, getallwallets };
    case `${GET_WALLET_BYID}_FULFILLED`:
      getwallet = action.payload.data.data;
      return { ...state, loading: false, getwallet };
    case `${UPDATE_WALLET}_FULFILLED`:
      updatewallet = action.payload.data.data;
      return { ...state, loading: false, updatewallet };
    case `${DELETE_WALLET}_FULFILLED`:
      deletewallet = action.payload.data.data;
      return { ...state, loading: false, deletewallet };
    case `${SET_WALLET}`:
      setwallet = action.payload;
      return { ...state, loading: false, setwallet };

    case `${CREATE_WALLET}_REJECTED`:
      return {
        ...state,
        loading: false,
        createwalleterror: action.payload,
        state: INITIALSTATE,
      };
    case `${GET_ALL_DIGITALWALLETS}_REJECTED`:
      return {
        ...state,
        loading: false,
        getallwalletserror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${GET_WALLET_BYID}_REJECTED`:
      return {
        ...state,
        loading: false,
        getwalleterror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${UPDATE_WALLET}_REJECTED`:
      return {
        ...state,
        loading: false,
        updatewalleterror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${DELETE_WALLET}_REJECTED`:
      return {
        ...state,
        loading: false,
        deletewalleterror: action.payload.data,
        state: INITIALSTATE,
      };

    default:
      return state;
  }
}

export default walletReducer;
