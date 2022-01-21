const defaultVariables = {
  chainId: 97,
  jsonRpcProviderUrl: 'wss://data-seed-prebsc-1-s1.binance.org:8545',
  ipfsUploadUrl: 'https://ipfs.infura.io:5001',
  ipfsDownloadUrl: 'https://ipfs.infura.io/ipfs',
};

const environmentVariables = {
  mandatory: {
    chainId:
      (process.env.REACT_APP_CHAIN_ID && +process.env.REACT_APP_CHAIN_ID) ||
      defaultVariables.chainId,
    jsonRpcProviderUrl:
      process.env.REACT_APP_JSON_RPC_PROVIDER_URL ||
      defaultVariables.jsonRpcProviderUrl,
    ipfsUploadUrl:
      process.env.REACT_APP_IPFS_UPLOAD_URL || defaultVariables.ipfsUploadUrl,
    ipfsDownloadUrl:
      process.env.REACT_APP_IPFS_DOWNLOAD_URL ||
      defaultVariables.ipfsDownloadUrl,
  },
  optional: {},
};

export function appEnv() {
  return environmentVariables;
}
