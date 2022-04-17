import React, { useState } from "react";
import { connect } from "react-redux";
import { changeLoad } from "../redux/action";
import { tokenSaleAddress } from "../components/configureMetamask";

const BuyToken = ({ state, changeLoad }) => {
  const [val, setVal] = useState("");
  const { tokenSaleInstance, currentAccount, currentRate, load } = state;
  const handleBuyToken = async () => {
    if (val <= 0) return alert("Input a valid amount !!");
    if (!tokenSaleInstance) return alert("Contract Instance not connected !!");
    try {
      const tx = await tokenSaleInstance.buyToken(val, {
        from: currentAccount,
        value: val * currentRate,
      });
      await tx.wait();
      changeLoad(!load);
      setVal("");
    } catch (err) {
      if (!err.data) return;
      const errMsg = err.data.message;
      const msg = errMsg.slice(
        errMsg.indexOf("'") + 1,
        errMsg.lastIndexOf("'")
      );
      console.error(errMsg);
      alert(msg);
    }
  };
  return (
    <div className="buytoken">
      <div className="buytoken__container">
        <div className="buytoken__container--heading">Buy Token</div>
        <div className="buytoken__container--input">
          <input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            type="number"
            className="buy-token-input"
            placeholder="Type Amount of Token"
          />
          <button onClick={handleBuyToken} className="buy-token-btn">
            Buy
          </button>
        </div>
        <div className="buytoken__container--text">
          Send Ether to this address to get Flat Token:{" "}
          <b>{tokenSaleAddress}</b>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps, { changeLoad })(BuyToken);
