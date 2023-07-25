import { InjectedConnector } from "@web3-react/injected-connector";
import Web3 from "web3";

import version from "../utils/manageVersion";

export const injected = new InjectedConnector({
  //hardcode
  supportedChainIds: [parseInt(version.chainID)]
});

export const getLibrary = (provider) => new Web3(provider);
