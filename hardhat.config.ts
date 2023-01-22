import type {HardhatUserConfig} from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import 'hardhat-deploy';
import '@nomiclabs/hardhat-solhint';
import 'dotenv/config';

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY || '0'.repeat(64);
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

const config: HardhatUserConfig = {
    solidity: '0.8.17',
    defaultNetwork: 'hardhat',
    networks: {
        localhost: {
            live: false,
            saveDeployments: true,
            tags: ['local'],
        },
        hardhat: {
            live: false,
            saveDeployments: true,
            tags: ['test', 'local'],
        },
        goerli: {
            url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [PRIVATE_KEY],
            live: true,
            saveDeployments: true,
            tags: ['staging'],
            deploy: ['testnet-deploy/'],
        },
    },
    namedAccounts: {
        deployer: 0,
    },
    gasReporter: {
        enabled: COINMARKETCAP_API_KEY !== undefined,
        currency: 'USD',
        coinmarketcap: COINMARKETCAP_API_KEY,
    },
    etherscan: {
        apiKey: {
            goerli: ETHERSCAN_API_KEY,
        },
    },
};

export default config;
