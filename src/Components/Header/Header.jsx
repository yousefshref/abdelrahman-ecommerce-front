import Navbar from "../Navbar/Navbar";
import React from "react";
import Slider from "../Slider/Slider";

const Header = () => {
  return (
    <header className="md:p-5 p-1.5">
      <Navbar />
      <div>
        <Slider />
      </div>
    </header>
  );
};

export default Header;
