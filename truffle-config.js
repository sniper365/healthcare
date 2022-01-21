const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs
  .readFileSync('.secret')
  .toString()
  .trim();
  
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "src/contracts"),
  networks: {
    local: {
      host: "127.0.0.1",
      port: 9545,
      network_id: '5777' // Match any network id
    },
    testnet: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          `wss://data-seed-prebsc-1-s1.binance.org:8545`
        );
      },
      network_id: 97,
      // gas: 4500000,
      // gasPrice: 10000000000,
    },
  },
  compilers: {
    solc: {
      version: "0.8.4"
    }
  }
};
