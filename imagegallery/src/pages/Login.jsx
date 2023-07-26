import {
  Box,
  Flex,
  Image,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import imageUrl from "../assets/signup.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { myContext } from "../context/Contextapi";
import { toast } from "react-toastify";

function Login() {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { islogin, setLogin } = useContext(myContext);

  const handle = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      let Logindata = await axios.post(
        "http://localhost:5000/user/login",

        {
          email: inputData.email,
          password: inputData.password,
        }
      );
      console.log(Logindata);
      localStorage.setItem("Token", JSON.stringify(Logindata.data.user.token));
      localStorage.setItem("User", JSON.stringify(inputData.email));
      setLogin(!islogin);
      // signinAction(true);

      // console.log(Logindata.data.user.token)
      toast.success("Login Sucessful!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/");
    } catch (error) {
      // console.log(error)
      toast.error("Login failed !", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log(error);
    }
  };
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

          <Button colorScheme="blue" type="submit" onClick={handleSignin}>
            Sign In
          </Button>
        </form>
      </Box>
    </Flex>
  );
}

export default Login;
