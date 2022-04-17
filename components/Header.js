import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import { changeMetamaskStatus } from "../redux/action";

const Header = ({ state, changeMetamaskStatus }) => {
  const {
    isOwner,
    metamaskStatus,
    currentAccount,
    metamaskConnectFunction,
    currentRate,
    totalWeiCollected,
    totalTokenSold,
    contractBalance,
    accountBalance,
  } = state;
  const accountDisplay = `${currentAccount.substr(
    0,
    5
  )}...${currentAccount.substr(
    currentAccount.length - 4,
    currentAccount.length
  )}`;
  return (
    <>
      <div className="header">
        <div className="header__container">
          <div className="header__container--first">
            <div className="header__container--first__item">
              <Link href="/buytoken">Buy Tokens</Link>
            </div>
            <div className="header__container--first__item">
              <Link href="/transfertoken">Transfer Tokens</Link>
            </div>
            {isOwner && (
              <div className="header__container--first__item">
                <Link href="/approvekyc">Approve KYC</Link>
              </div>
            )}
          </div>
          <div className="header__container--second">
            {metamaskStatus ? (
              <div className="header__address-display">
                <div className="header__address-display--container">
                  {accountDisplay}
                </div>
              </div>
            ) : (
              <div className="header__connect-button">
                <button
                  onClick={() => metamaskConnectFunction(changeMetamaskStatus)}
                >
                  Connect Metamask
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {metamaskStatus && (
        <div className="header-bottom">
          <div className="header-bottom__container">
            {isOwner && (
              <>
                <div className="header-bottom-item">
                  Total Wei Collected: {totalWeiCollected}
                </div>
                <div className="header-bottom-item">
                  Total Tokens Buyed: {totalTokenSold} FLT
                </div>
                <div className="header-bottom-item">
                  Contract Balance: {contractBalance}
                </div>
              </>
            )}
            <div className="header-bottom-item">
              Current Rate: {currentRate}
            </div>
            <div className="header-bottom-item">
              Account Balance: {accountBalance} FLT
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToState = (state) => ({ state });

export default connect(mapStateToState, { changeMetamaskStatus })(Header);
