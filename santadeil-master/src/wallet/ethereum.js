import version from "../utils/manageVersion";

export const ethereumConnect = () =>
  window.ethereum?.request({ method: "eth_requestAccounts" });
export const isEthereumConnected = window.ethereum
  ? window.ethereum?.isConnected()
  : false;
export const isEthereumMetaMask = window.ethereum
  ? window.ethereum.isMetaMask
  : null;
export const ethereumSendTransaction = (params) =>
  window.ethereum?.request({
    method: "eth_sendTransaction",
    params,
  });

export const switchNetwork = (chainIDHex) => {
  window.ethereum?.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: chainIDHex }], // testnet // mainnet
  });
}


export const setupNetwork = async () => {
  const provider = window.ethereum;
  if (provider) {
    try {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainName: process.env.REACT_APP_MAIN_CHAIN,
            chainId: process.env.REACT_APP_CHAIN_ID_HEX,
            nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
            rpcUrls: [process.env.REACT_APP_RPC_URL_ADD_WALLET],
          },
        ],
      });
      return true;
    } catch (error) {
      console.warn(error);
      return false;
    }
  } else {
    console.warn(
      "Can't setup the BSC network on metamask because window.ethereum is undefined",
    );
    return false;
  }
};
