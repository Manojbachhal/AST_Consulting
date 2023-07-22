import React from "react";
import { Route, Routes } from "react-router-dom";
import Gallery from "../pages/Gallery";
import ImageUpload from "../pages/ImageUpload";

function Allroutes() {
  return (
    <Routes>
      <Route path="/" element={<ImageUpload />} />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  );
}

export default Allroutes;
