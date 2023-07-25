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
  console.log("switchNetwork", chainIDHex);
  window.ethereum?.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: chainIDHex }], // testnet // mainnet
  });
}


export const setupNetwork = async () => {
  console.log(process.env);
  const provider = window.ethereum;
  if (provider) {
    try {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainName: process.env.REACT_APP_CHAIN,
            chainId: process.env.REACT_APP_CHAIN_ID_HEX,
            nativeCurrency: { name: 'Binance Coin', decimals: 18, symbol: 'BNB' },
            rpcUrls: [process.env.REACT_APP_RPC_URL],
            blockExplorerUrls: [process.env.REACT_APP_BLOCK_EXPLORER_URL],
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
