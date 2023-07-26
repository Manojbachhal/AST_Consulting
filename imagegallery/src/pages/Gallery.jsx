import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiTwotoneHeart } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { FaCommentSlash } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import { TbAlbum } from "react-icons/tb";
import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import "./style.css";
import { toast } from "react-toastify";
import { SearchIcon } from "@chakra-ui/icons";

const SecondModal = ({
  isOpen2,
  setIsOpen2,
  imageUrl,
  albumName,
  setAlbumname,
}) => {
  const [AlbumnData, setAlbumData] = useState("");

  const onClose = () => {
    setIsOpen2({
      isOpen: !isOpen2,
      imageUrl: "",
    });
  };

  const getAlbums = async () => {
    let res = await axios.get(
      "https://splendid-getup-goat.cyclic.app/image/albumnames"
    );
    setAlbumname(res.data);
  };

  // const onOpen = () => {
  //   setIsOpen2(true);
  // };

  const handleAlbumn = (e) => {
    setAlbumData(e.target.value);
  };

  const handleAlbumreq = async () => {
    let token = JSON.parse(localStorage.getItem("Token"));
    await axios.post(
      "https://splendid-getup-goat.cyclic.app/image/createalbum",
      {
        imageUrl,
        albumName: AlbumnData,
        token,
      }
    );
    toast.success("Image Added to Album successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    getAlbums();
  };
  const handleAlbumreqPrev = async (name) => {
    let token = JSON.parse(localStorage.getItem("Token"));
    await axios.post(
      "https://splendid-getup-goat.cyclic.app/image/createalbum",
      {
        imageUrl,
        albumName: name,
        token,
      }
    );
    toast.success("Image Added to Album successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    getAlbums();
  };

  return (
    <>
      {/* <Button onClick={onOpen}>Open Second Modal</Button> */}
      <Modal isOpen={isOpen2} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Image To Album</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading fontSize={"18px"}>Your albums</Heading>
            <Text
              fontSize={"14px"}
              marginTop={"10px"}
              color={"blue"}
              fontStyle={"italic"}
            >
              Create a new album or Click on exiting albums to add the image
            </Text>
            <Grid gridTemplateColumns={"repeat(4,1fr)"} margin={"20px"}>
              {albumName.map((albumNames) => {
                return (
                  <Text
                    key={albumNames}
                    color={"blue.600"}
                    cursor={"pointer"}
                    onClick={() => {
                      handleAlbumreqPrev(albumNames);
                    }}
                  >
                    #{albumNames}
                  </Text>
                );
              })}
            </Grid>
            {
              <form>
                <input
                  style={{
                    borderRadius: "30px",
                    padding: "5px 20px",
                  }}
                  type="text"
                  id="comment"
                  placeholder="Enter Album Name"
                  onChange={handleAlbumn}
                />
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAlbumreq();
                    document.querySelector("form").reset();
                  }}
                  style={{ border: "none", background: "none" }}
                >
                  <BsArrowRightCircleFill
                    style={{ color: "blue", fontSize: "30px" }}
                  ></BsArrowRightCircleFill>
                </Button>
              </form>
            }
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

function Gallery() {
  const [SearchData, setSearch] = useState();
  const [isOpen2, setIsOpen2] = useState({
    isOpen: false,
    imageUrl: "",
  });
  const [state, setState] = useState();
  const [commentpopupData, setCPopupData] = useState({
    id: -1,
    comments: [],
    index: -1,
  });
  // const [keyWords, setkeyWords] = useState("");
  const [commentdata, setCommentData] = useState("");
  const [albumName, setAlbumname] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getAlbums = async () => {
    let res = await axios.get(
      "https://splendid-getup-goat.cyclic.app/image/albumnames"
    );
    setAlbumname(res.data);
  };
  // const handleInputChange = (e) => {
  //   setkeyWords(e.target.value);
  // };
  const getAllImages = async () => {
    let res = await axios.get(
      "https://splendid-getup-goat.cyclic.app/image/allimages"
    );

    setState(res.data);
  };

  const handleComment = (e) => {
    setCommentData(e.target.value);
  };

  const handleCommentreq = async (id, index) => {
    let token = JSON.parse(localStorage.getItem("Token"));

    let res = await axios.post(
      "https://splendid-getup-goat.cyclic.app/image/addcomment",
      {
        _id: id,
        commentdata,
        token,
      }
    );
    if (res.data.message === "comment updated successfully") {
      const updatedData = [...state]; // Create a copy of the state array

      let user = JSON.parse(localStorage.getItem("User"));

      updatedData[index].comment.push({ user, data: commentdata }); // Update the copy with the new comment

      setState(updatedData); // Update the state with the modified copy
      setCommentData("");
    }

    document.getElementById("comment").innerHTML = "";
  };

  const updateLikes = async (ele) => {
    let res = await axios.post(
      "https://splendid-getup-goat.cyclic.app/image/updateLike",
      {
        _id: ele._id,
        likes: ele.likes + 1,
      }
    );
    if (res.data.message === "Likes updated successfully") getAllImages();
  };
  // console.log(state);

  const handleDownload = (imageUrl) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "image.jpg";
    link.target = "_blank"; // This will open the link in a new tab
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleSearch = async () => {
    let res = await axios.post(
      "https://splendid-getup-goat.cyclic.app/image/search",
      {
        SearchData,
      }
    );

    setState(res.data);
    // console.log(res.data);

    // setState(searchDta);
    document.getElementById("searchinput").value = "";
    // console.log(searchDta);
  };

  useEffect(() => {
    getAllImages();
  }, []);
  return (
    <>
      <Flex
        width={"800px"}
        padding={" 15px 30px"}
        borderBottomLeftRadius={"30px"}
        borderBottomRightRadius={"30px"}
        // bg={"linear-gradient(45deg, #f85a04, #51f4f5, #eab04c)"}
        bg={"#51f4f5"}
        margin={"auto"}
      >
        <InputGroup>
          <InputLeftElement
            className="InputLeft"
            pointerEvents="none"
            children={<SearchIcon className="SearchIcon" />}
            size="xs"
            ml={"20px"}
          />
          <Input
            className="Input"
            variant="outline"
            onChange={(e) => setSearch(e.target.value)}
            id="searchinput"
            focusBorderColor="white"
            placeholder="Type search keyword"
            border={"2px"}
            borderRadius={"lg"}
            width={"95%"}
            ml={"20px"}
          />
        </InputGroup>
        <Button
          onClick={() => handleSearch()}
          bg={"#D1BB67"}
          border={"2px solid black"}
        >
          <SearchIcon fontSize={"16px"} marginTop={"3px"} />
        </Button>
      </Flex>
      {/*==================== image card div=================== */}

      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
        {state?.map((images, index) => {
          return (
            <Box
              style={{
                marginTop: "50px",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
              }}
              key={index.toString()}
            >
              <img
                src={images.image}
                width={"100%"}
                style={{ height: "100%" }}
                alt={images.image}
              />
              <Flex>
                {/* ========================likes button======================== */}
                <Button
                  onClick={() => {
                    updateLikes(images);
                  }}
                >
                  <h1>{images.likes} </h1>
                  <AiTwotoneHeart
                    style={{
                      marginLeft: "10px",
                      border: "red",
                      paddingRight: "10px",
                      fontSize: "40px",
                      color: "#fc5e7a",
                    }}
                  />
                </Button>
                {/* =========================comment button========================= */}
                <Button
                  onClick={() => {
                    setCPopupData({
                      id: images._id,
                      comments: images.comment,
                      index,
                    });
                    onOpen();
                  }}
                >
                  <AiOutlineComment
                    style={{
                      fontSize: "24px",
                    }}
                  />
                </Button>
                {/* ==========================download button=========================== */}
                {/* <a href={images.image} download={"myImage"}> */}
                <Button onClick={() => handleDownload(images.image)}>
                  <BsDownload
                    style={{
                      border: "red",
                      fontSize: "20px",
                    }}
                  />
                </Button>
                {/* </a> */}

                {/* =======================Albumn button==================================== */}
                <Button
                  onClick={() => {
                    setIsOpen2({
                      isOpen: !isOpen2.isOpen,
                      imageUrl: images.image,
                    });
                    getAlbums();
                  }}
                >
                  <TbAlbum
                    style={{
                      color: "green",
                      fontSize: "25px",
                    }}
                  />
                </Button>
              </Flex>
            </Box>
          );
        })}
      </SimpleGrid>

      {/* ====================comment popup model================================= */}
      <Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Recent Comments</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {commentpopupData.comments?.map((element, i) => {
                return (
                  <div>
                    <p
                      style={{
                        // margin: "4px",
                        background: "#F0F2F5",
                        padding: "6px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                      }}
                      key={element.toString() + i}
                    >
                      {element.data}
                    </p>
                    <p style={{ textAlign: "end", margin: "0px 0px 15px 0px" }}>
                      <sub>By {element.user}</sub>
                    </p>
                  </div>
                );
              })}
              <form style={{ marginTop: "40px" }}>
                <input
                  style={{
                    borderRadius: "30px",
                    padding: "5px 20px",
                  }}
                  type="text"
                  id="comment"
                  placeholder="Enter Comment"
                  onChange={handleComment}
                />
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleCommentreq(
                      commentpopupData.id,
                      commentpopupData.index
                    );
                    document.querySelector("form").reset();
                  }}
                  background={"none"}
                >
                  <BsArrowRightCircleFill
                    style={{ color: "blue", fontSize: "30px" }}
                  ></BsArrowRightCircleFill>
                </Button>
              </form>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                <FaCommentSlash
                  style={{
                    color: "red",
                    fontSize: "24px",
                  }}
                />
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

      {/* =================Album popup model==================================== */}
      <Box>
        <SecondModal
          isOpen2={isOpen2.isOpen}
          setIsOpen2={setIsOpen2}
          imageUrl={isOpen2.imageUrl}
          albumName={albumName}
          setAlbumname={setAlbumname}
        />
      </Box>
    </>
  );
}

export default Gallery;
