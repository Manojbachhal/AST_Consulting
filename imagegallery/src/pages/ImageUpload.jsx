import React, { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";

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
        width: "600px",
        padding: "40px",
        boxShadow: "1px 1px 10px black",
        marginBottom: "60px",
      }}
    >
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
      <input
        type="text"
        placeholder="Enter words seprated with comma"
        style={{ width: "500px", marginRight: "10px", padding: "10px" }}
        onChange={handleInputChange}
      />
      <button style={{ marginTop: "30px" }} onClick={handleFileUpload}>
        Upload
      </button>
    </div>
  );
}

export default ImageUpload;
