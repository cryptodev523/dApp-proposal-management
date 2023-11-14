import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

export const ProposalForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    console.log("on submit");
  };

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="3xl" mb={6}>
        Create a Proposal
      </Text>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Proposal Title</FormLabel>
          <Input
            type="text"
            placeholder="Proposal Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            isRequired
          />
        </FormControl>
        <FormControl mt={6}>
          <FormLabel>Proposal Description</FormLabel>
          <Input
            type="text"
            placeholder="Proposal Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            isRequired
          />
        </FormControl>
        <Button width="100%" type="submit" colorScheme="teal" mt={6}>
          Submit
        </Button>
      </form>
    </VStack>
  );
};
