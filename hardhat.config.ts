import "@nomicfoundation/hardhat-toolbox-viem";
import "hardhat-abi-exporter";
import "dotenv/config";
import { HardhatUserConfig, NetworkUserConfig } from "hardhat/types";

const bscTestnet: NetworkUserConfig = {
    url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    chainId: 97,
    // accounts: [process.env.KEY_BSCTESTNET!],
    accounts: ['3aabc80fb67b84627719429eb2810637df33c60923a1eaa2470bd266052751ba'],
};

const bsc: NetworkUserConfig = {
    url: "https://bsc-dataseed.binance.org/",
    chainId: 56,
    // accounts: [process.env.KEY_BSC!],
    accounts: ['3aabc80fb67b84627719429eb2810637df33c60923a1eaa2470bd266052751ba'],
};

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        localnode: {
            url: 'http://127.0.0.1:8545',
            chainId: 31337,
            accounts: [
                '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
                '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
                '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a'
            ]
        },
        bscTestnet,
        bsc
    },
    solidity: {
        version: "0.8.4",
        settings: {
            optimizer: {
                enabled: true,
                runs: 99999,
            },
        },
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
    abiExporter: {
        path: "./data/abi",
        clear: true,
        flat: false,
    },
};

export default config;
