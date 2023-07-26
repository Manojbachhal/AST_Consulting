import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../assets/image.png";
function Header() {
  return (
    <Box
      //   bg={"linear-gradient(45deg, #8e44ad, #058eea, #7ab6de)"}
      // bg={"linear-gradient(45deg, #f85a04, #51f4f5, #eab04c)"}
      bg={"#51f4f5"}
      // bg={"linear-gradient(45deg, #b004f8, #5189f5, #4caaea)"}
      p={"12px"}
      position="sticky"
      top="-1"
      zIndex="999"
    >
      <Flex justify={"space-between"} align={"center"} paddingBottom={"10px"}>
        <Flex marginLeft={"20px"} gap={"20px"}>
          <img src={logo} alt="" width={"6%"} />
          <Heading fontFamily={"cursive"} fontSize={"25px"}>
            Image Gallery
          </Heading>
        </Flex>
        <Flex
          gap={"25px"}
          // fontSize={"18px"}
          align={"center"}
          fontWeight={"600"}
          paddingRight={"30px"}
          overflowY={{ base: "auto", md: "auto", lg: "unset" }}
        >
          <Link to="/">Home</Link>
          <Link to="/gallery">Upload Image</Link>
          <Link to="/sign-up">Sign up</Link>
          <Link to="/sign-in">Login</Link>
          <Link to="/albums">Albums</Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;

// background: linear-gradient(45deg, #b004f8, #0beeff, #4caaea);
// background: linear-gradient(45deg, #b004f8, #ff0b8c, #eaab4c);
// background: linear-gradient(45deg, #b004f8, #ff0b8c, #ff9900);

// background: linear-gradient(45deg, #FF671F, #f2f2f2, #046A38);
