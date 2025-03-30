const HDWalletProvider = require('@truffle/hdwallet-provider');

// Replace with your Ganache mnemonic
const mnemonic = "debris join banana direct mushroom buddy engine onion snap reform rather dolphin";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
};