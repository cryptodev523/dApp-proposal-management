import {
  Box,
  Button,
  Flex,
  Icon,
  List,
  ListItem,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

export const ProposalList = ({ proposals }: { proposals: IProposal[] }) => {
  const toast = useToast();

  const handleVote = async (id: string, vote: boolean) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BE_SERVER}/proposals/${id}/vote`,
        { isYesVote: vote }
      );

      if (response.status === 200) {
        toast({
          title: "Vote submitted.",
          description: "Your vote has been submitted.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error("Failed to submit vote");
      }
    } catch (error) {
      console.error("Failed to vote", error);

      toast({
        title: "Failed to submit vote.",
        description: "An error occurred while submitting your vote.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
                  onClick={() => handleVote(proposal.id, false)}
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
