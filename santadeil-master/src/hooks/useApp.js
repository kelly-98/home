import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import spinnerAbi from "../utils/spin";
import { convertToCustomDate } from "../utils/date";
import { ethers } from "ethers";

const Gift = {
  0: "Strawberry",
  1: "Candy Cane",
  2: "Santa Gift",
  3: "Gingerbread",
  4: "Strawberry IceCream",
  5: "Christmas Beanie",
  6: "Sweet Candy",
  7: "Snowball",
};

const useApp = () => {
  const { account } = useWeb3React();
  const spin = useCallback(async (setIsStartSpin) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.REACT_APP_SPINNER_CONTRACT,
      spinnerAbi,
      signer
    );

    try {
      const tx = await contract.spin({ gasLimit: 290000 });
      setIsStartSpin(true);
      await tx.wait();
      return true;
    } catch (err) {
      setIsStartSpin(false);
      return false;
    }
  }, []);

  const getResults = useCallback(async () => {
    if (account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        process.env.REACT_APP_SPINNER_CONTRACT,
        spinnerAbi,
        provider.getSigner()
      );
      const result = await contract.getResults();

      return result.map((t) => {
        return {
          id: t["id"].toNumber(),
          isClaimed: t["isClaimed"],
          gift: Gift[t["gift"]],
          time: convertToCustomDate(new Date(t["timestamp"].toNumber() * 1000)),
        };
      });
    } else {
      return [];
    }
  }, [account]);

  const getLatestResult = useCallback(async () => {
    if (account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        process.env.REACT_APP_SPINNER_CONTRACT,
        spinnerAbi,
        provider.getSigner()
      );
      const result = await contract.getLatestResult();

      return result?.gift;
    } else {
      return "None";
    }
  }, [account]);

  const claim = useCallback(
    async (id) => {
      if (account) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          process.env.REACT_APP_SPINNER_CONTRACT,
          spinnerAbi,
          signer
        );
        const tx = await contract.claim(id);
        const done = await tx.wait();
        return done;
      }
    },
    [account]
  );

  return { spin, getResults, claim, getLatestResult };
};

export default useApp;
