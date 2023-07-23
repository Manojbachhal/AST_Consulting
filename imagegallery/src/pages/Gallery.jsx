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
} from "@chakra-ui/react";
import "./style.css";
const SecondModal = ({ isOpen2, setIsOpen2, imageUrl }) => {
  const [AlbumnData, setAlbumData] = useState("");

  const onClose = () => {
    setIsOpen2({
      isOpen: !isOpen2,
      imageUrl: "",
    });
  };

  // const onOpen = () => {
  //   setIsOpen2(true);
  // };

  const handleAlbumn = (e) => {
    setAlbumData(e.target.value);
  };

  const handleAlbumreq = async (imageUrl) => {
    let res = await axios.post("http://localhost:5000/image/createalbum", {
      imageUrl,
      albumName: AlbumnData,
    });
    console.log(res);
  };

  return (
    <>
      {/* <Button onClick={onOpen}>Open Second Modal</Button> */}
      <Modal isOpen={isOpen2} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Second Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                <button
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
                </button>
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
  const [keyWords, setkeyWords] = useState("");
  // const [commentsVisibility, setCommentsVisibility] = useState([]);
  // const [hoverButtonsVisibility, setButtonsVisibility] = useState([]);
  const [commentdata, setCommentData] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleInputChange = (e) => {
    setkeyWords(e.target.value);
    // console.log(keyWords);
  };
  const getAllImages = async () => {
    let res = await axios.get("http://localhost:5000/image/allimages");
    // console.log(res.data);

    setState(res.data);
  };

  const handleComment = (e) => {
    setCommentData(e.target.value);
  };

  const handleCommentreq = async (id, index) => {
    let res = await axios.post("http://localhost:5000/image/addcomment", {
      _id: id,
      commentdata,
    });
    if (res.data.message === "comment updated successfully") {
      const updatedData = [...state]; // Create a copy of the state array
      updatedData[index].comment.push(commentdata); // Update the copy with the new comment

      setState(updatedData); // Update the state with the modified copy
      setCommentData("");
    }

    document.getElementById("comment").innerHTML = "";
  };

  const updateLikes = async (ele) => {
    let res = await axios.post("http://localhost:5000/image/updateLike", {
      _id: ele._id,
      likes: ele.likes + 1,
    });
    if (res.data.message === "Likes updated successfully") getAllImages();
  };

  const handleDownload = (imageUrl) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log(imageUrl);
  };

  useEffect(() => {
    getAllImages();
  }, []);
  return (
    <>
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
                    // console.log(images.comment);
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
                  onClick={() =>
                    setIsOpen2({
                      isOpen: !isOpen2.isOpen,
                      imageUrl: images.image,
                    })
                  }
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
                  <p
                    style={{
                      // margin: "4px",
                      background: "#F0F2F5",
                      padding: "6px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      margin: "10px 20px",
                    }}
                    key={element.toString() + i}
                  >
                    {element}
                  </p>
                );
              })}
              <form>
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
        <SecondModal isOpen2={isOpen2.isOpen} setIsOpen2={setIsOpen2} />
      </Box>
    </>
  );
}

export default Gallery;
