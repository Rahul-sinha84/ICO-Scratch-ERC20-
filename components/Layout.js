import { useEffect } from "react";
import {
  checkMetamaskStatus,
  connectMetamask,
  firstFunc,
  listenToEvents,
} from "./configureMetamask";

import { connect } from "react-redux";
import {
  changeTokenInstance,
  changeMoneyCollectorInstance,
  changeTokenSaleInstance,
  changeLoad,
  changeCurrentAccount,
  changeMetamaskConnectFunction,
  changeMetamaskStatus,
  changeNetworkId,
  changeIsOwner,
  changeAccountBalance,
  changeContractBalance,
  changeTotalTokensSold,
  changeTotalWeiCollected,
  changeCurrentRate,
} from "../redux/action";
import Header from "./Header";

const Layout = ({
  children,
  changeTokenInstance,
  changeTokenSaleInstance,
  changeMoneyCollectorInstance,
  changeMetamaskConnectFunction,
  changeCurrentAccount,
  changeIsOwner,
  changeLoad,
  changeNetworkId,
  changeMetamaskStatus,
  changeCurrentRate,
  changeAccountBalance,
  changeContractBalance,
  changeTotalTokensSold,
  changeTotalWeiCollected,
  state,
}) => {
  const {
    tokenInstance,
    tokenSaleInstance,
    moneyCollectorInstance,
    currentAccount,
    load,
    networkId,
    metamaskStatus,
    metamaskConnectFunction,
  } = state;

  //default
  useEffect(() => {
    firstFunc(
      changeTokenInstance,
      changeTokenSaleInstance,
      changeMoneyCollectorInstance,
      changeCurrentAccount,
      changeNetworkId,
      changeMetamaskStatus
    );
    checkMetamaskStatus(
      changeMetamaskStatus,
      changeCurrentAccount,
      changeNetworkId
    );
    changeMetamaskConnectFunction(connectMetamask);
  }, []);

  // for updating the change when metamask configuration changes !!
  useEffect(() => {
    // function to update the values of state
    getContractData();
    // for listening of events
    //    listenToEvents(contract);
  }, [currentAccount, load]);

  const getContractData = async () => {
    if (
      !tokenInstance ||
      !tokenSaleInstance ||
      !moneyCollectorInstance ||
      !currentAccount
    )
      return;
    const _owner = await tokenSaleInstance.getOwner();
    changeIsOwner(parseInt(_owner, 16) === parseInt(currentAccount, 16));
    const _currentRate = await tokenSaleInstance.rate();
    changeCurrentRate(_currentRate.toNumber());
    const _totalWeiCollected = await tokenSaleInstance.weiCollected();
    changeTotalWeiCollected(_totalWeiCollected.toNumber());
    const _totalTokenSold = await tokenSaleInstance.tokenCollected();
    changeTotalTokensSold(_totalTokenSold.toNumber());
    const _accountBalance = await tokenInstance.getBalance(currentAccount);
    changeAccountBalance(_accountBalance.toNumber());
    const _contractBalance = await moneyCollectorInstance.getBalance();
    changeContractBalance(_contractBalance.toNumber());
  };

  return (
    <>
      <Header />
      {!metamaskStatus ? (
        <div className="main__warning-msg">
          Please Connect your Metamask Wallet to continue !!
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

const mapStateToState = (state) => ({ state });
export default connect(mapStateToState, {
  changeTokenInstance,
  changeTokenSaleInstance,
  changeMoneyCollectorInstance,
  changeMetamaskConnectFunction,
  changeCurrentAccount,
  changeLoad,
  changeNetworkId,
  changeMetamaskStatus,
  changeIsOwner,
  changeCurrentRate,
  changeAccountBalance,
  changeContractBalance,
  changeTotalTokensSold,
  changeTotalWeiCollected,
})(Layout);
