import {
  Box,
  Button,
  Flex,
  Icon,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

export const ProposalList = ({ proposals }: { proposals: IProposal[] }) => {
  const handleVote = (id: string, vote: boolean) => {};

  return (
    <Box my={12}>
      <Text fontSize="3xl" mb={6} textAlign="center">
        Proposal List
      </Text>
      <List spacing={4}>
        {proposals.map((proposal) => (
          <ListItem key={proposal.id}>
            <Flex justify="space-between" align="center" width="100%">
              <VStack>
                <Text fontSize="2xl" fontWeight="bold">
                  {proposal.title}
                </Text>
                <Text fontStyle="italic">{proposal.description}</Text>
              </VStack>
              <Flex justify="space-between" gap={2}>
                <Button
                  colorScheme="green"
                  onClick={() => handleVote(proposal.id, true)}
                  leftIcon={<Icon as={FaThumbsUp} />}
                >
                  Yes Votes: {proposal.yesVotes}
                </Button>
                <Button
                  onClick={() => handleVote(proposal.id, true)}
                  leftIcon={<Icon as={FaThumbsDown} />}
                >
                  No Votes: {proposal.noVotes}
                </Button>
              </Flex>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
