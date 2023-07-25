import { useCallback } from "react";
import { ethers } from "ethers";
import erc20Abi from "../utils/erc20";
import { useWeb3React } from "@web3-react/core";

const useErc20 = () => {
  const { account } = useWeb3React();

  const approve = useCallback(
    () => {
      if (account) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contractErc20 = new ethers.Contract(
          process.env.REACT_APP_TOKEN_CONTRACT,
          erc20Abi,
          provider.getSigner()
        );
        return contractErc20
          .approve(
            process.env.REACT_APP_SPINNER_CONTRACT,
            ethers.BigNumber.from(10).pow(60)
          )
          .then(async (res) => {
            const data = await res.wait();
            const { transactionHash } = data;
            // toast.success("Success", transactionHash);
            return true;
          })
          .catch((err) => {
            // toast.error(err.error?.message || err.message);
          });
      }
      return false;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account]
  );

  const allowance = useCallback(
    () => {
      if (account) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contractErc20 = new ethers.Contract(
          process.env.REACT_APP_TOKEN_CONTRACT,
          erc20Abi,
          provider.getSigner()
        );
        return contractErc20
          .allowance(account, process.env.REACT_APP_SPINNER_CONTRACT)
          .then((res) => res);
      }
      return Promise.resolve(ethers.BigNumber.from("0"));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account]
  );

  const mint = useCallback(
    () => {
      if (account) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contractErc20 = new ethers.Contract(
          process.env.REACT_APP_TOKEN_CONTRACT,
          erc20Abi,
          provider.getSigner()
        );
        return contractErc20
          .mint()
          .then(async (res) => {
            const data = await res.wait();
            const { transactionHash } = data;
            // toast.success("Success", transactionHash);
            return true;
          })
          .catch((err) => {
            // toast.error(err.error?.message || err.message);
          });
      }
      return false;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account]
  );

  return {
    approve,
    allowance,
    mint
  };
};

export default useErc20;
