const express = require("express");
const { createServer } = require("http");
const socketIO = require("socket.io");
const ProposalContract = require("../contracts/build/contracts/ProposalContract.json");
const { Web3 } = require("web3");

const app = express();
const server = createServer(app);
const io = socketIO(server);

const web3 = new Web3("http://localhost:7545");

const proposalContract = new web3.eth.Contract(
  ProposalContract.abi,
  "0xc8B57335a31917360C584866514C4f8eC1B60272"
);

// API to fetch all proposals
app.get("/proposals", async (req, res) => {
  try {
    const proposals = await proposalContract.methods.readProposals().call();
    res.json(proposals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// API to create proposal

app.post("/proposals", async (req, res) => {
  try {
    const { title, description, senderAddress } = req.body;
    const proposal = await proposalContract.methods
      .createProposal(title, description)
      .send({ from: senderAddress });

    // Emit a `newProposal` event to notify all connected clients
    io.emit("newProposal", proposal);
    res.status(201).send("Proposal submitted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// API to vote on a proposal

app.post("/proposals/:id/vote", async (req, res) => {
  try {
    const { id, isYesVote, voterAddress } = req.body;
    await proposalContract.methods
      .voteOnProposal(id, isYesVote)
      .send({ from: voterAddress });

    // Emit a `newVote` event to notify all connected clients
    io.emit("newVote", { proposalId: id, isYesVote });
    res.status(200).send("Vote submitted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
