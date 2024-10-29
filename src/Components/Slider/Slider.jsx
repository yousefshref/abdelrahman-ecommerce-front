import React from "react";
import { FaCircleArrowRight } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Slider = () => {
  const slides = [
    "https://i.pinimg.com/control/564x/cb/3d/39/cb3d3999aa56d7a2ed371c85574f3f98.jpg",
    "https://i.pinimg.com/control/564x/db/bf/dd/dbbfdd567877c9605419f321997e59f9.jpg",
  ];

  const [activeSlide, setActiveSlide] = React.useState(0);

  const nextSlide = () => {
    if (activeSlide === slides.length - 1) {
      setActiveSlide(0);
    } else {
      setActiveSlide(activeSlide + 1);
    }
  };

  const prevSlide = () => {
    if (activeSlide === 0) {
      setActiveSlide(slides.length - 1);
    } else {
      setActiveSlide(activeSlide - 1);
    }
  };

  return (
    <div className="md:h-[40vw] h-[60vw] relative">
      <div
        style={{
          backgroundImage: `url(${slides[activeSlide]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full h-full flex justify-center items-center overflow-hidden" />

      <button onClick={prevSlide} className="absolute transition-all duration-300 hover:bg-black/75 text-white top-1/2 -translate-y-1/2 flex flex-col justify-center items-center right-1 md:w-[45px] w-[25px] md:h-[45px] h-[25px] rounded-full bg-black">
        <IoIosArrowForward size={25} />
      </button>
      <button onClick={nextSlide} className="absolute transition-all duration-300 hover:bg-black/75 text-white top-1/2 -translate-y-1/2 flex flex-col justify-center items-center left-1 md:w-[45px] w-[25px] md:h-[45px] h-[25px] rounded-full bg-black">
        <IoIosArrowBack size={25} />
      </button>

      <div className="w-full absolute bottom-0 md:p-2 p-1 bg-black/10 flex justify-center items-center gap-5">
        {slides?.map((slide, index) => (
          <span key={index} className={`p-1 rounded-full flex flex-col w-fit h-fit ${index === activeSlide ? "bg-lime-500" : "bg-white"}`} />
        ))}
      </div>
    </div>
  );
};

export default Slider;
