import { useWeb3React } from "@web3-react/core";
import injected from "../utils/web3React";
import { useCallback } from "react";
import { setupNetwork, switchNetwork } from "../wallet";

const useAuth = () => {
  const { activate, deactivate } = useWeb3React();

  const login = useCallback(() => {
    const connector = injected;
    if (connector) {
      activate(connector, async (error) => {
        console.log("error", error);
        if (error) {
          console.log(error);
          const hasSetup = await setupNetwork();
          if (hasSetup) {
            console.log("setupNetwork");
            return;
          } else {
            await switchNetwork(process.env.REACT_APP_MAIN_CHAIN_ID_HEX);
          }
        } else {
          console.log("no error");
        }
      });
    } else {
      console.info("Unable to find connector", "The connector config is wrong");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(() => {
    deactivate();
  }, [deactivate]);

  return { login, logout };
};

export default useAuth;
