import {
  CURRENT_ACCOUNT,
  LOAD,
  METAMASK_CONNECT_FUNCTION,
  METAMASK_STATUS,
  MONEYCOLLECTOR_INSTANCE,
  NETWORK_ID,
  TOKENSALE_INSTANCE,
  TOKEN_INSTANCE,
} from "./types";

export const changeMetamaskStatus = (payload) => ({
  type: METAMASK_STATUS,
  payload,
});
export const changeTokenInstance = (payload) => ({
  type: TOKEN_INSTANCE,
  payload,
});
export const changeTokenSaleInstance = (payload) => ({
  type: TOKENSALE_INSTANCE,
  payload,
});
export const changeMoneyCollectorInstance = (payload) => ({
  type: MONEYCOLLECTOR_INSTANCE,
  payload,
});
export const changeCurrentAccount = (payload) => ({
  type: CURRENT_ACCOUNT,
  payload,
});
export const changeMetamaskConnectFunction = (payload) => ({
  type: METAMASK_CONNECT_FUNCTION,
  payload,
});
export const changeNetworkId = (payload) => ({ type: NETWORK_ID, payload });
export const changeLoad = (payload) => ({ type: LOAD, payload });
