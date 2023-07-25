import { InjectedConnector } from "@web3-react/injected-connector";
import { CHAIN_ID } from "./chains";

const injected = new InjectedConnector({
  supportedChainIds: [
    CHAIN_ID.BSC,
    CHAIN_ID.BSC_TESTNET,
    CHAIN_ID.MATIC,
    CHAIN_ID.MATIC_TESTNET,
    CHAIN_ID.ETH,
    Number(process.env.REACT_APP_CHAIN_ID),
  ],
});


export default injected;
