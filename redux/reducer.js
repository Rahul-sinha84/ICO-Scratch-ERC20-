import { combineReducers } from "redux";
import {
  ACCOUNT_BALANCE,
  CONTRACT_BALANCE,
  CONTRACT_INSTANCE,
  CURRENT_ACCOUNT,
  CURRENT_RATE,
  IS_OWNER,
  LOAD,
  METAMASK_CONNECT_FUNCTION,
  METAMASK_STATUS,
  MONEYCOLLECTOR_INSTANCE,
  NETWORK_ID,
  TOKENSALE_INSTANCE,
  TOKEN_INSTANCE,
  TOTAL_TOKENS_SOLD,
  TOTAL_WEI_COLLECTED,
} from "./types";

const metamaskStatus = (state = false, action) => {
  if (action.type === METAMASK_STATUS) return action.payload;
  return state;
};
const tokenInstance = (state = "", action) => {
  if (action.type === TOKEN_INSTANCE) return action.payload;
  return state;
};
const tokenSaleInstance = (state = "", action) => {
  if (action.type === TOKENSALE_INSTANCE) return action.payload;
  return state;
};
const moneyCollectorInstance = (state = "", action) => {
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
const isOwner = (state = false, action) => {
  if (action.type === IS_OWNER) return action.payload;
  return state;
};
const currentRate = (state = "", action) => {
  if (action.type === CURRENT_RATE) return action.payload;
  return state;
};
const totalWeiCollected = (state = "", action) => {
  if (action.type === TOTAL_WEI_COLLECTED) return action.payload;
  return state;
};
const totalTokenSold = (state = "", action) => {
  if (action.type === TOTAL_TOKENS_SOLD) return action.payload;
  return state;
};
const contractBalance = (state = "", action) => {
  if (action.type === CONTRACT_BALANCE) return action.payload;
  return state;
};
const accountBalance = (state = "", action) => {
  if (action.type === ACCOUNT_BALANCE) return action.payload;
  return state;
};

export default combineReducers({
  metamaskConnectFunction,
  tokenInstance,
  isOwner,
  currentRate,
  tokenSaleInstance,
  totalWeiCollected,
  totalTokenSold,
  contractBalance,
  accountBalance,
  moneyCollectorInstance,
  currentAccount,
  metamaskStatus,
  networkId,
  load,
});
