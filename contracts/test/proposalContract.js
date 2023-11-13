const ProposalContract = artifacts.require("ProposalContract");

contract("ProposalContract", (accounts) => {
  let proposalContract;

  before(async () => {
    proposalContract = await ProposalContract.deployed();
  });

  it("should create a new proposal", async () => {
    await proposalContract.createProposal(
      "Proposal title",
      "Proposal description",
      {
        from: accounts[0],
      }
    );
    const proposal = await proposalContract.proposals(0);
    assert.equal(proposal.title, "Proposal title");
    assert.equal(proposal.description, "Proposal description");
  });

  it("should allow to vote on a proposal", async () => {
    await proposalContract.voteOnProposal(0, true, { from: accounts[0] });
    const proposal = await proposalContract.proposals(0);
    assert.equal(proposal.yesVotes, 1);
  });

  it("should not allow to vote twice on a proposal", async () => {
    try {
      await proposalContract.voteOnProposal(0, true, { from: accounts[0] });
    } catch (error) {
      assert(
        error.message.indexOf("revert") >= 0,
        "error message must contain revert"
      );
    }
  });
});
