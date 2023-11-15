const Web3 = jest.fn().mockImplementation(() => {
  return {
    eth: {
      Contract: jest.fn().mockImplementation(() => {
        return {
          methods: {
            readProposals: jest.fn().mockImplementation(() => {
              return {
                call: jest.fn().mockImplementation(() => {
                  return [
                    {
                      id: "1",
                      title: "Test Proposal",
                      description: "This is a test proposal",
                      yesVotes: "0",
                      noVotes: "0",
                    },
                  ];
                }),
              };
            }),
            createProposal: jest.fn().mockImplementation(() => {
              return {
                send: jest.fn().mockImplementation(() => {
                  return {};
                }),
              };
            }),
            voteOnProposal: jest.fn().mockImplementation(() => {
              return {
                send: jest.fn().mockImplementation(() => {
                  return {};
                }),
              };
            }),
          },
        };
      }),
    },
  };
});

module.exports = { Web3 };
