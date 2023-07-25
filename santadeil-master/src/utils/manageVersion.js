const testVersion = {
  chain: process.env.REACT_APP_MAIN_CHAIN,
  chainID: process.env.REACT_APP_CHAIN_ID,
  chainIDHex: process.env.REACT_APP_CHAIN_ID_HEX,
  rpcUrl: process.env.REACT_APP_RPC_URL_ADD_WALLET,
  rpcWsUrl: process.env.REACT_APP_RPC_WS_URL,
  walletAddRpcUrls: [process.env.REACT_APP_RPC_URL_ADD_WALLET],
  blockExplorerUrls: [process.env.REACT_APP_BLOCK_EXPLORER_URL],
};

const version = testVersion;
// const gameVersion = mainVersion;

export default version;
