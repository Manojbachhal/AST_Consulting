import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Gallery from "../pages/Gallery";
import ImageUpload from "../pages/ImageUpload";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import { myContext } from "../context/Contextapi";
import Albums from "../pages/Albums";

function Allroutes() {
  const { islogin } = useContext(myContext);

  return (
    <Routes>
      <Route path="/gallery" element={islogin ? <ImageUpload /> : <Login />} />
      <Route path="/" element={<Gallery />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/albums" element={<Albums />} />
      <Route path="/sign-in" element={islogin ? <Gallery /> : <Login />} />
    </Routes>
  );
}

export default Allroutes;
