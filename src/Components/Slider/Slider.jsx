import React, { useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { CategoryContextProvider } from "../../Contexts/CategoryContext";
import { api } from "../../Variables/server";

// Images (replace with your images)
// const images = [
//   "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   "https://images.pexels.com/photos/620337/pexels-photo-620337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
// ];

const Slider = () => {

  const categoryContext = useContext(CategoryContextProvider)

  const images = categoryContext?.homePageImages

  useEffect(() => {
    categoryContext?.getHomePageImages()
  }, [])

  return (
    <div className="w-full mx-auto md:mt-8 mt-4">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 1000,
          // disableOnInteraction: false,
        }}
        speed={1000}
        loop={true}
        // pagination={{
        //   clickable: true,
        // }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {images?.map((image, index) => (
          <SwiperSlide key={index} className="w-full flex justify-center">
            <div className="relative">
              <img src={api + image?.image} alt={`Slide ${index + 1}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;