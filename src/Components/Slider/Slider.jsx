import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Images (replace with your images)
const images = [
  "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/620337/pexels-photo-620337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const Slider = () => {
  return (
    <div className="w-full md:max-w-5xl mx-auto mt-8">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={1700}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {images?.map((image, index) => (
          <SwiperSlide key={index} className="group">
            <div className="relative">
              <img src={image} alt={`Slide ${index + 1}`} className="w-full" />
              {/* Arrows appear on small screens by default, and on hover for larger screens */}
              <div className="swiper-button-next opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="swiper-button-prev opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;