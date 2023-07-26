import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, SimpleGrid } from "@chakra-ui/react";
function Albums() {
  const [allAlbums, setallAlbums] = useState([]);
  const getAllImages = async () => {
    let token = JSON.parse(localStorage.getItem("Token"));
    let res = await axios.post("http://localhost:5000/image/albums", {
      token,
    });

    const temp = res.data;
    const AllData = [];
    temp.map((ele) => {
      let al = ele.albums;
      al.map((image) => {
        const allImage = image.images;
        // console.log(allImage, "fsdf");
        allImage.map((mainImage) => {
          AllData.push(mainImage);
        });
      });
    });
    setallAlbums(AllData);
    console.log(allAlbums);
  };
  useEffect(() => {
    getAllImages();
  }, []);
  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
        {allAlbums?.map((images, index) => {
          return (
            <Box
              style={{
                marginTop: "50px",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
              }}
              border={"1px solid gray"}
              key={index.toString()}
            >
              <img
                src={images}
                width={"100%"}
                style={{ height: "100%" }}
                alt={images}
              />
            </Box>
          );
        })}
      </SimpleGrid>
    </>
  );
}

export default Albums;
