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
		params: [{ chainId: '0xA4B1' }],
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
						chainName: 'Arbitrum One',
						chainId: '0xA4B1',
						nativeCurrency: { name: 'Ethereum', decimals: 18, symbol: 'ETH' },
						rpcUrls: ['https://arb1.arbitrum.io/rpc'],
						blockExplorerUrls: ['https://arbiscan.io/'],
					},
				],
			});
			return true;
		} catch (error) {
			console.warn(error);
			return false;
		}
	} else {
		return false;
	}
};
