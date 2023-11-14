import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export const ProposalForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BE_SERVER}/proposals`,
        { title, description }
      );

      if (response.status === 201) {
        // Clear the form
        setTitle("");
        setDescription("");

        // Show success toast
        toast({
          title: "Proposal created.",
          description: "Your proposal has been created.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error("Failed to create proposal");
      }
    } catch (error) {
      console.error("Failed to create proposal", error);

      toast({
        title: "Failed to create proposal.",
        description: "An error occurred while creating your proposal.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
