import {
  Box,
  Flex,
  Image,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import imageUrl from "../assets/signup.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handle = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      let data = await axios.post("http://localhost:5000/user/register", {
        name: inputData.name,

        email: inputData.email,
        password: inputData.password,
      });
      if (data) {
        // toast.success("Registration Sucessful Redirecting to Login page", {
        //   position: "top-center",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        // });
        setTimeout(() => {
          navigate("/sign-in");
        }, 2000);

        console.log(data);
      }
    } catch (error) {
      console.log("error");
    }
  };
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
            <Input
              type="text"
              name="name"
              placeholder="Enter your full name"
              onChange={handle}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handle}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handle}
            />
          </FormControl>

          <Button colorScheme="blue" type="submit" onClick={handleSubmit}>
            Sign Up
          </Button>
        </form>
      </Box>
    </Flex>
  );
}

export default Signup;
