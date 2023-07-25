const testVersion = {
  chain: process.env.REACT_APP_CHAIN,
  chainID: process.env.REACT_APP_CHAIN_ID,
  chainIDHex: process.env.REACT_APP_CHAIN_ID_HEX,
  rpcUrl: process.env.REACT_APP_RPC_URL,
  walletAddRpcUrls: [process.env.REACT_APP_RPC_URL],
  blockExplorerUrls: [process.env.REACT_APP_BLOCK_EXPLORER_URL],
};

const version = testVersion;
// const gameVersion = mainVersion;

export default version;
