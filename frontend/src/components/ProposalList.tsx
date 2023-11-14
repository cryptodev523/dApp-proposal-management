import { Box, List, ListItem, Text } from "@chakra-ui/react";
import { useState } from "react";

export const ProposalList = () => {
  const [proposals, setProposals] = useState<IProposal[]>([
    {
      title: "title1",
      description: "description1",
      id: "0",
      yesVotes: "0",
      noVotes: "1",
    },
    {
      title: "title2",
      description: "description2",
      id: "1",
      yesVotes: "1",
      noVotes: "0",
    },
  ]);

  return (
    <Box my={12}>
      <Text fontSize="3xl" mb={6}>
        Proposal List
      </Text>
      <List>
        {proposals.map((proposal) => (
          <ListItem key={proposal.id}>
            <Box>
              <Box>{proposal.title}</Box>
              <Box>{proposal.description}</Box>
              <Box>Yes Votes: {proposal.yesVotes}</Box>
              <Box>No Votes: {proposal.noVotes}</Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
