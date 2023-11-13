// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ProposalContract {
    struct Proposal {
        uint256 id;
        string title;
        string description;
        uint256 yesVotes;
        uint256 noVotes;
    }

    // all proposals
    Proposal[] public proposals;

    // mapping to track if an address has voted on a proposal
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    // event for new proposal
    event ProposalCreated(uint256 indexed id, string title, string description);

    // event for new vote
    event Voted(uint256 indexed id, address indexed voter, bool vote);

    // function to create a new proposal
    function createProposal(string memory _title, string memory _description) public {
        uint256 id = proposals.length;
        proposals.push(Proposal({
            id: id, title: _title, description: _description, yesVotes: 0, noVotes: 0
        }));
        emit ProposalCreated(id, _title, _description);
    }

    // function to read all proposals
    function readProposals() public view returns (Proposal[] memory) {
        return proposals;
    }

    // function to vote on a proposal
    function voteOnProposal(uint256 _id, bool _isYesVote) public { 
        require(_id < proposals.length, "Proposal does not exist");
        require(!hasVoted[_id][msg.sender], "You have already voted on this proposal");
        if (_isYesVote) {
            proposals[_id].yesVotes++;
        } else {
            proposals[_id].noVotes++;
        }
        hasVoted[_id][msg.sender] = true;
        emit Voted(_id, msg.sender, _isYesVote);
    }
}