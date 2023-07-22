import React, { useEffect, useState } from "react";
import axios from "axios";
function Gallery() {
  const [state, setState] = useState();
  const getAllImages = async () => {
    let res = await axios.get(
      "https://splendid-getup-goat.cyclic.app/image/allimages"
    );
    // setState(res.data.images);
    console.log(res.data.images);
  };
  useEffect(() => {
    getAllImages();
  }, []);
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {state?.map((ele, index) => {
        return (
          <div key={index}>
            <img src={ele} style={{ width: "200px" }} />
            <p>Likes</p>
          </div>
        );
      })}
    </div>
  );
}

export default Gallery;
