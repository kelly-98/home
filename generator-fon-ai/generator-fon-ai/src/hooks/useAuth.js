import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import { injected } from "../wallet/connectors";
import { setupNetwork, switchNetwork } from "../wallet";
import useSignMessage from "../wallet/sign";

const useAuth = () => {
	const { activate, deactivate } = useWeb3React();
	const { signMessage } = useSignMessage();

	const login = useCallback(async () => {
		const connector = injected;
		if (connector) {
			try {
				await activate(connector);
				await signMessage();
			} catch (error) {
				return false;
			}
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
