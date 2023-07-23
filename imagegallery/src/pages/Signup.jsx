import {
  Box,
  Flex,
  Image,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import React from "react";
import imageUrl from "../assets/signup.jpg";
function Signup() {
  return (
    <Flex justify="center" align="center" minHeight="100vh">
      {/* Left Half: Image */}
      <Box w="45%">
        <Image
          src={imageUrl}
          alt="Signup Image"
          width={"40vw"}
          objectFit="cover"
          h="100vh"
        />
      </Box>

      {/* Right Half: Signup Form */}
      <Box w="55%" p={4}>
        <form>
          <FormControl mb={4}>
            <FormLabel>Full Name</FormLabel>
            <Input type="text" placeholder="Enter your full name" />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter your email" />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" />
          </FormControl>

          <Button colorScheme="blue" type="submit">
            Sign Up
          </Button>
        </form>
      </Box>
    </Flex>
  );
}

export default Signup;
