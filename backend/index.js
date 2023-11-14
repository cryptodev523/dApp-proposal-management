const express = require("express");
const { createServer } = require("http");
const socketIO = require("socket.io");
const ProposalContract = require("../contracts/build/contracts/ProposalContract.json");
const { Web3 } = require("web3");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const server = createServer(app);
const io = socketIO(server);

const web3 = new Web3("http://localhost:7545");

const JWT_SECRET = "passphrase";

const proposalContract = new web3.eth.Contract(
  ProposalContract.abi,
  "0xc8B57335a31917360C584866514C4f8eC1B60272"
);

// Parse incoming request with JSON payloads.
app.use(express.json());
app.use(cors());

// Middleware for JWT authentication
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// API to login
app.post("/login", (req, res) => {
  const { address } = req.body;
  if (address) {
    const user = { address };
    const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
    res.json({ accessToken });
  } else {
    res.send("Please provide an address");
  }
});

// API to fetch all proposals
app.get("/proposals", authenticateJWT, async (req, res) => {
  try {
    let proposals = await proposalContract.methods.readProposals().call();
    // Convert BigInt to string
    proposals = proposals.map((proposal) => ({
      title: proposal.title,
      description: proposal.description,
      id: proposal.id.toString(),
      yesVotes: proposal.yesVotes.toString(),
      noVotes: proposal.noVotes.toString(),
    }));
    res.json(proposals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// API to create proposal

app.post("/proposals", authenticateJWT, async (req, res) => {
  try {
    const { title, description } = req.body;
    const senderAddress = req.user.address;
    let proposal = await proposalContract.methods
      .createProposal(title, description)
      .send({ from: senderAddress, gas: 5000000 });
    // Convert BigInt to string
    proposal = {
      transactionHash: proposal.transactionHash,
      blockHash: proposal.blockHash,
    };
    // Emit a `newProposal` event to notify all connected clients
    io.emit("newProposal", proposal);
    res.status(201).send("Proposal submitted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// API to vote on a proposal

app.post("/proposals/:id/vote", authenticateJWT, async (req, res) => {
  try {
    const id = req.params.id;
    const { isYesVote } = req.body;
    const voterAddress = req.user.address;
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
