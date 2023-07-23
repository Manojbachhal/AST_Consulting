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
function Login() {
  return (
    <Flex justify="center" align="center" minHeight="100vh">
      {/* Left Half: Image */}
      <Box w="45%">
        <Image
          src={imageUrl}
          alt="Login Image"
          width={"40vw"}
          objectFit="cover"
          h="100vh"
        />
      </Box>

      {/* Right Half: Login Form */}
      <Box w="55%" p={4}>
        <form>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter your email" />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" />
          </FormControl>

          <Button colorScheme="blue" type="submit">
            Sign In
          </Button>
        </form>
      </Box>
    </Flex>
  );
}

export default Login;
