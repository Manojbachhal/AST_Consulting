import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiTwotoneHeart } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { FaCommentSlash } from "react-icons/fa";
function Gallery() {
  const [state, setState] = useState();
  const [keyWords, setkeyWords] = useState("");
  const [commentsVisibility, setCommentsVisibility] = useState([]);
  const [commentdata, setCommentData] = useState("");

  const handleInputChange = (e) => {
    setkeyWords(e.target.value);
    // console.log(keyWords);
  };
  const getAllImages = async () => {
    let res = await axios.get("http://localhost:5000/image/allimages");
    // console.log(res.data);
    setCommentsVisibility(new Array(res.data.length).fill(false));
    setState(res.data);
  };

  const handleComment = (e) => {
    setCommentData(e.target.value);
  };

  const handleCommentreq = (ele) => {
    axios
      .post("http://localhost:5000/image/addcomment", {
        _id: ele._id,
        commentdata,
      })
      .then(() => getAllImages);
  };

  const updateLikes = (ele) => {
    axios
      .post("http://localhost:5000/image/updateLike", {
        _id: ele._id,
        likes: ele.likes + 1,
      })
      .then(() => getAllImages);
  };

  const toggleCommentVisibility = (index) => {
    console.log(index);
    setCommentsVisibility((prevVisibility) =>
      prevVisibility.map((vis, i) => (i === index ? !vis : vis))
    );
  };

  useEffect(() => {
    getAllImages();
  }, []);
  return (
    <>
      {/* heading and search input div */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <h1> IMAGE GALLARY</h1>
        <div>
          <input
            type="text"
            placeholder="Search image by keywords"
            onChange={handleInputChange}
          />
          <button>Search</button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gap: "10px",
          margin: "40px 0px",
          gridTemplateColumns: "repeat(3,1fr)",
        }}
      >
        {state?.map((ele, index) => {
          return (
            <div key={index} style={{ fontSize: "20px" }}>
              {/* image card */}
              <div
                style={{
                  width: "400px",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                }}
              >
                <img
                  src={ele.image}
                  style={{ width: "100%", height: "250px" }}
                />
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    {ele.likes}
                    <AiTwotoneHeart
                      style={{
                        color: "red",
                        paddingRight: "10px",
                        fontSize: "24px",
                      }}
                    />
                  </div>
                  {/* like and comment in image cart */}

                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      padding: "5px",
                    }}
                  >
                    <BsHandThumbsUp
                      style={{ color: "red" }}
                      onClick={() => {
                        updateLikes(ele);
                      }}
                    />
                    <AiOutlineComment
                      style={{
                        display: !commentsVisibility ? "none" : "block",
                      }}
                      onClick={() => toggleCommentVisibility(index)}
                    />
                    <FaCommentSlash
                      style={{
                        display: commentsVisibility ? "none" : "block",
                        color: "red",
                      }}
                      onClick={() => () => toggleCommentVisibility(index)}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: !commentsVisibility[index] ? "none" : "block",
                    fontSize: "16px",
                    padding: "20px",
                    textAlign: "left",
                    background: "#dcf8dc",
                  }}
                >
                  {ele.comment?.map((element, i) => {
                    return (
                      <p style={{ margin: "4px" }} key={element.toString() + i}>
                        {element}
                      </p>
                    );
                  })}
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      marginTop: "20px",
                    }}
                  >
                    <input
                      style={{
                        borderRadius: "30px",
                        padding: "5px 20px",
                      }}
                      type="text"
                      placeholder="Enter Comment"
                      onChange={handleComment}
                    />
                    <BsArrowRightCircleFill
                      style={{ color: "blue", fontSize: "30px" }}
                      onClick={() => handleCommentreq(ele)}
                    >
                      Add Comment
                    </BsArrowRightCircleFill>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Gallery;
