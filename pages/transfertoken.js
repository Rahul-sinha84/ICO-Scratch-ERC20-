import React, { useState } from "react";
import { connect } from "react-redux";
import { changeLoad } from "../redux/action";

const TransferToken = ({ state, changeLoad }) => {
  const [account, setAccount] = useState("");
  const [val, setVal] = useState("");

  const { tokenInstance, currentAccount, load } = state;

  const handleTransferToken = async () => {
    if (!account || val <= 0) return alert("Invalid Input !!");
    if (!tokenInstance) return alert("Contract not connected !!");
    try {
      const tx = await tokenInstance.transfer(account, val, {
        from: currentAccount,
      });
      await tx.wait();

      setAccount("");
      setVal("");
      changeLoad(!load);
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
    <div className="transfer-token">
      <div className="transfer-token__container">
        <div className="transfer-token__container--heading">Transfer Token</div>
        <div className="transfer-token__container--input">
          <input
            type="text"
            className="transfer-token__input transfer-token__input--address"
            placeholder="Type Address"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
          <input
            placeholder="Type amount of Token"
            type="number"
            className="transfer-token__input"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <button onClick={handleTransferToken} className="transfer-token__btn">
            Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps, { changeLoad })(TransferToken);
