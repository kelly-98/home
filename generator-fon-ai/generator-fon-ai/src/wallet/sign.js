import Web3 from "web3";
import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";

const useSignMessage = () => {
	const { account } = useWeb3React();
	const signMessage = useCallback(async () => {

	let message = `Welcome to FonAI!

Click to sign in and accept the FonAI Terms of Service

This request will not trigger a blockchain transaction or cost any gas fees.

Wallet address:	${account}`;
		var web3 = new Web3(window.ethereum);

		var promise = await web3.eth.personal.sign(
			message,
			account
		);
		return promise;
	}, [account])
	return { signMessage }
}


export default useSignMessage;