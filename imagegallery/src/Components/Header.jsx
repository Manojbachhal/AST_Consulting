import React, { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import logo from "../assets/image.png";
function Header() {
  const [searchisOpen, setSearchIsOpen] = useState(false);
  return (
    <Box
      //   bg={"linear-gradient(45deg, #8e44ad, #058eea, #7ab6de)"}
      bg={"linear-gradient(45deg, #f85a04, #51f4f5, #eab04c)"}
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
          <Button onClick={() => setSearchIsOpen(!searchisOpen)}>
            {!searchisOpen ? (
              <SearchIcon fontSize={"16px"} marginTop={"3px"} />
            ) : (
              <CloseIcon fontSize={"12px"} />
            )}
          </Button>
        </Flex>
      </Flex>

      <Collapse in={searchisOpen} transition=" 0.3s">
        <InputGroup>
          <InputLeftElement
            className="InputLeft"
            pointerEvents="none"
            children={<SearchIcon className="SearchIcon" color="gray.300" />}
            size="xs"
            ml={"20px"}
          />
          <Input
            className="Input"
            variant="outline"
            color={"white"}
            _placeholder={{ color: "white" }}
            focusBorderColor="white"
            placeholder="Type search keyword"
            border={"2px"}
            borderRadius={"lg"}
            width={"95%"}
            ml={"20px"}
          />
        </InputGroup>
      </Collapse>
    </Box>
  );
}

export default Header;

// background: linear-gradient(45deg, #b004f8, #0beeff, #4caaea);
// background: linear-gradient(45deg, #b004f8, #ff0b8c, #eaab4c);
// background: linear-gradient(45deg, #b004f8, #ff0b8c, #ff9900);

// background: linear-gradient(45deg, #FF671F, #f2f2f2, #046A38);
