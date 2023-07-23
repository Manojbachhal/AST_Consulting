import React from "react";
import { Route, Routes } from "react-router-dom";
import Gallery from "../pages/Gallery";
import ImageUpload from "../pages/ImageUpload";
import Signup from "../pages/Signup";
import Login from "../pages/Login";

function Allroutes() {
  return (
    <Routes>
      <Route path="/gallery" element={<ImageUpload />} />
      <Route path="/" element={<Gallery />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/sign-in" element={<Login />} />
    </Routes>
  );
}

export default Allroutes;
