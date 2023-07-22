import React, { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (files) => {
    setSelectedFile(files[0]);
  };

  const handleFileUpload = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        await axios.post(
          "https://splendid-getup-goat.cyclic.app/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Do something after successful upload
        console.log("Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const getAllImages = async () => {
    let res = await axios.get(
      "https://splendid-getup-goat.cyclic.app/image/allimages"
    );
    console.log(res);
  };

  return (
    <div>
      <h2>Image Upload</h2>
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
      <button onClick={handleFileUpload}>Upload</button>
      <button onClick={getAllImages}>GetAll</button>
    </div>
  );
}

export default ImageUpload;
