import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import abi from "../utils/abi";
import { ethers } from "ethers";


const useApp = () => {
  const { account, chainId } = useWeb3React();

  const getTotalTokens = useCallback(async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT,
      abi,
      provider
    );

    const balance = await contract.totalTokens();
    return +ethers.utils.formatUnits(balance, 9);
  }, [])

  const getRemainingTokens = useCallback(async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT,
      abi,
      provider
    );

    const balance = await contract.remainingTokens();
    const netBalance = +ethers.utils.formatUnits(balance, 9);
    return netBalance;
  }, [])

  const getStartDate = useCallback(async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT,
      abi,
      provider
    );

    const startDate = await contract.startTime();
    return startDate;

  }, [])

  const getEndDate = useCallback(async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT,
      abi,
      provider
    );

    const endDate = await contract.endTime();
    return endDate;

  }, [])


  const checkEligible = useCallback(async (a) => {
    if (!a) return false;
    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT,
      abi,
      provider
    );

    const eligible = await contract.whitelist(a);
    return eligible
  }, [account, chainId])

  const getAirdropAmounts = useCallback(async (a) => {
    if (!a) return false;
    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT,
      abi,
      provider
    );

    const balance = await contract.airdropAmounts(a);
    return +ethers.utils.formatUnits(balance, 9);
  }, [account, chainId])

  const claimAirdrop = useCallback(async () => {
    if (!account) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT,
      abi,
      provider.getSigner()
    );

    await contract.claimAirdrop();
  }, [account, chainId])



  return { getTotalTokens, checkEligible, getAirdropAmounts, getStartDate, getEndDate, getRemainingTokens,claimAirdrop }
};

export default useApp;
