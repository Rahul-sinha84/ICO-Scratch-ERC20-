import React, { useState } from "react";
import { connect } from "react-redux";
import { changeLoad } from "../redux/action";

const ApproveKyc = ({ state, changeLoad }) => {
  const [account, setAccount] = useState("");

  const { load, tokenSaleInstance, currentAccount } = state;

  const handleKycApproval = async () => {
    if (!account) return alert("Enter Valid Input !!");
    if (!tokenSaleInstance) return alert("Contract not connected !!");

    try {
      const tx = await tokenSaleInstance.approveKyc(account);
      await tx.wait();

      changeLoad(!load);
      setAccount("");
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
    <div className="approve-kyc">
      <div className="approve-kyc__container">
        <div className="approve-kyc__container--heading">Approve KYC</div>
        <div className="approve-kyc__container--input">
          <input
            type="text"
            className="approve-kyc-input"
            placeholder="Enter Account Address"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
          <button onClick={handleKycApproval} className="approve-kyc-btn">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps, { changeLoad })(ApproveKyc);
