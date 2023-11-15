# dApp Proposal Management

This is a dApp for creating, reading, and voting on proposals using Ethereum smart contract.

## Demo



https://github.com/cryptodev523/dApp-proposal-management/assets/3051782/44c3ac55-6ca1-4f62-872d-53408a92f74e



## Prerequisites

- Node.js and npm
- Truffle
- Ganache
- Metamask

## Setup

1. Clone the repository:

```bash
git clone git@github.com:cryptodev523/dApp-proposal-management.git
```

2. Install the dependencies:

```bash
cd dApp-proposal-management

cd backend
npm install

cd ..
cd frontend
npm install
```

3. In the `backend` directory, create a `.env` file and add the following variables:

```bash
FRONTEND_URL=<your-frontend-url>
WEB3_PROVIDER_URL=<your-web3-provider-url>
CONTRACT_ADDRESS=<your-contract-address>
```

Replace <your-frontend-url>, <your-web3-provider-url>, and <your-contract-address> with your actual frontend URL, Web3 provider URL, and contract address, respectively.

4. In the `frontend` directory, create a `.env` file and add the following variable:

```bash
REACT_APP_BE_SERVER=<your-backend-url>
```

Replace <your-backend-url> with your actual backend URL.

5. Start Ganache and create a workspace with the truffle-config.js file.

Reference: https://trufflesuite.com/docs/ganache/quickstart

6. Compile and migrate the smart contracts:

```bash
truffle compile
truffle migrate
```

7. Import the Ganache accounts into Metamask using the private keys provided by Ganache.

## Running the Application

1. Start the local backend server:

```bash
cd backend
npm start
```

2. Start the local frontend:

```bash
cd frontend
npm start
```

3. Open your browser and go to http://localhost:3001. 

4. Connect Metamask to the local Ethereum blockchain provided by Ganache.

5. Interact with the application through the web interface.

## Testing

Run the tests with the following command:

```bash
cd contracts
truffle test
```
