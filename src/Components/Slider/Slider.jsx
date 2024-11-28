import React, { useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { CategoryContextProvider } from "../../Contexts/CategoryContext";
import { api } from "../../Variables/server";
import { useNavigate } from "react-router-dom";
import { productDetails } from "../../Variables/pathes";


const Slider = () => {

  const categoryContext = useContext(CategoryContextProvider)

  const images = categoryContext?.homePageImages

  useEffect(() => {
    categoryContext?.getHomePageImages()
  }, [])

  const navigate = useNavigate()

  return (
    <div className="w-full mx-auto md:mt-8 mt-4">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 1000,
        }}
        speed={1000}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        pagination={{
          clickable: true,
          type: "bullets",
        }}
        className="relative"
      >
        {images?.map((image, index) => (
          <SwiperSlide onClick={() => {
            if (image?.product) {
              navigate(productDetails(image?.product))
            }
          }} key={index} className="w-full flex justify-center">
            <div className="relative">
              <img
                loading="lazy"
                src={api + image?.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;