import {
  ACCOUNT_BALANCE,
  CONTRACT_BALANCE,
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
export const changeIsOwner = (payload) => ({ type: IS_OWNER, payload });
export const changeCurrentRate = (payload) => ({ type: CURRENT_RATE, payload });
export const changeTotalWeiCollected = (payload) => ({
  type: TOTAL_WEI_COLLECTED,
  payload,
});
export const changeTotalTokensSold = (payload) => ({
  type: TOTAL_TOKENS_SOLD,
  payload,
});
export const changeContractBalance = (payload) => ({
  type: CONTRACT_BALANCE,
  payload,
});
export const changeAccountBalance = (payload) => ({
  type: ACCOUNT_BALANCE,
  payload,
});
