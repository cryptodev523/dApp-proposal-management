# dApp Proposal Management

This is a dApp for creating, reading, and voting on proposals using Ethereum smart contract.

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

3. Start Ganache and create a workspace with the truffle-config.js file.

4. Compile and migrate the smart contracts:

```bash
truffle compile
truffle migrate
```

5. Import the Ganache accounts into Metamask using the private keys provided by Ganache.

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