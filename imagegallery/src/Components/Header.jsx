import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div style={{ display: "flex" }}>
      <Link to="/">Home</Link>
      <Link to="/gallery">Gallery</Link>
    </div>
  );
}

export default Header;
