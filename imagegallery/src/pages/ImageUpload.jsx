import React, { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [keyWords, setkeyWords] = useState();

  const handleFileChange = (files) => {
    setSelectedFile(files[0]);
  };
  const handleInputChange = (e) => {
    setkeyWords(e.target.value);
    console.log(keyWords);
  };
  const handleFileUpload = async () => {
    try {
      if (selectedFile) {
        const myArray = keyWords.split(",");
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("keys", myArray);

        await axios.post("http://localhost:5000/image/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Do something after successful upload
        console.log("Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div
      style={{
        margin: "auto",
        marginTop: "40px",
        width: "600px",
        padding: "60px",
        boxShadow: "1px 1px 10px black",
        marginBottom: "60px",
        borderRadius: "40px",
      }}
    >
      <Dropzone onDrop={handleFileChange}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            style={{
              border: "2px solid #ccc",
              padding: "20px",
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />
            <p>Drag and drop a file here, or click to select a file</p>
          </div>
        )}
      </Dropzone>
      <Box marginTop={"20px"}>
        <legend style={{ fontWeight: "bold" }}>Keyword related to image</legend>
        <Input
          type="text"
          placeholder="Enter keywords separated with a comma, e.g., anime, animals"
          style={{
            width: "500px",
            marginTop: "10px",
            marginRight: "10px",
            padding: "10px",
          }}
          required={true}
          onChange={handleInputChange}
        />
        <Button style={{ marginTop: "30px" }} onClick={handleFileUpload}>
          Upload
        </Button>
      </Box>
    </div>
  );
}

export default ImageUpload;
