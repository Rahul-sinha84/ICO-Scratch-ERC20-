import { combineReducers } from "redux";
import {
  CONTRACT_INSTANCE,
  CURRENT_ACCOUNT,
  LOAD,
  METAMASK_CONNECT_FUNCTION,
  METAMASK_STATUS,
  MONEYCOLLECTOR_INSTANCE,
  NETWORK_ID,
  TOKENSALE_INSTANCE,
  TOKEN_INSTANCE,
} from "./types";

const metamaskStatus = (state = false, action) => {
  if (action.type === METAMASK_STATUS) return action.payload;
  return state;
};
const tokenInstance = (state = {}, action) => {
  if (action.type === TOKEN_INSTANCE) return action.payload;
  return state;
};
const tokenSaleInstance = (state = {}, action) => {
  if (action.type === TOKENSALE_INSTANCE) return action.payload;
  return state;
};
const moneyCollectorInstance = (state = {}, action) => {
  if (action.type === MONEYCOLLECTOR_INSTANCE) return action.payload;
  return state;
};
const currentAccount = (state = "", action) => {
  if (action.type === CURRENT_ACCOUNT) return action.payload;
  return state;
};
const metamaskConnectFunction = (state = {}, action) => {
  if (action.type === METAMASK_CONNECT_FUNCTION) return action.payload;
  return state;
};
const networkId = (state = "", action) => {
  if (action.type === NETWORK_ID) return action.payload;
  return state;
};
const load = (state = false, action) => {
  if (action.type === LOAD) return action.payload;
  return state;
};

export default combineReducers({
  metamaskConnectFunction,
  tokenInstance,
  tokenSaleInstance,
  moneyCollectorInstance,
  currentAccount,
  metamaskStatus,
  networkId,
  load,
});
