import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import useErc20 from "../../hooks/useErc20";

const SpinButton = ({ isDisabled, spinClicked }) => {
  const { account } = useWeb3React();
  const { approve, allowance } = useErc20();

  const [reload, setReload] = useState(0);
  const [isApproved, setIsApproved] = useState(0);

  const handleApproval = () => {
    approve().then(() => {
      setReload(new Date().getTime());
    });
  };

  const getApprove = () => {
    allowance().then((res) => {
      setIsApproved(Number(ethers.utils.formatEther(res)));
    });
  };

  useEffect(() => {
    getApprove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, reload]);

  return isApproved || !account ? (
    <button
      className={`btn-primary ${isDisabled ? "btn-disabled" : ""} spin-btn`}
      disabled={isDisabled || !account}
      onClick={spinClicked}
    >
      <div className="light-blur">
        <div
          className={`btn-primary-wrapper ${
            isDisabled || !account ? "btn-disabled" : ""
          }`}
        >
          SPIN NOW
        </div>
      </div>
    </button>
  ) : (
    <button
      className={`btn-primary ${isDisabled ? "btn-disabled" : ""} spin-btn`}
      disabled={isDisabled || !account}
      onClick={handleApproval}
    >
      <div className="light-blur">
        <div className={`btn-primary-wrapper`}>Approve</div>
      </div>
    </button>
  );
};

export default SpinButton;
