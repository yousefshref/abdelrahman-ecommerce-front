import React, { useContext, useEffect, useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { CategoryContextProvider } from "../Contexts/CategoryContext";
import { MdDelete } from "react-icons/md";

import ImageHomeScreen from "./ImageHomeScreen/ImageHomeScreen";

import { api } from "../Variables/server";
import CropImage from "./CropImage";
import { Avatar } from "@chakra-ui/react";

const HomePageImage = () => {
  const categoryContext = useContext(CategoryContextProvider);

  const images = categoryContext?.homePageImages;

  useEffect(() => {
    categoryContext?.getHomePageImages();
  }, []);

  const [image, setImage] = useState(null); // State to store the final cropped image file
  const [imageSrc, setImageSrc] = useState(null); // State to hold the original image for cropping
  const fileInputRef = useRef(null); // Reference to trigger the hidden file input

  // Trigger file input when the button is clicked
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Load the selected file as a data URL for the cropper
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Set the cropped image as a file in the state
  const handleCropComplete = (croppedImage) => {
    // Convert the cropped data URL back to a File object
    fetch(croppedImage)
      .then((res) => res.blob())
      .then((blob) => {
        const croppedFile = new File([blob], "cropped_image.jpg", {
          type: "image/jpeg",
        });
        setImage(croppedFile);
        categoryContext?.createHomePageImage({ image: croppedFile }, () => { });
        setImageSrc(null); // Clear the cropping modal
      });
  };

  return (
    <div className="md:p-4 p-3 w-full bg-black rounded-2xl mt-2">
      <div className="flex gap-2 items-center">
        <div className="w-2 h-1 bg-green-500"></div>
        <p className="underline text-2xl md:text-3xl font-bold">
          تفاصيل المتجر
        </p>
      </div>
      <div className="p-3 md:p-5 my-5 flex flex-col gap-8">
        {/* Store Name */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xl md:text-3xl font-bold">اسم المتجر</p>
          <div className="flex gap-2 items-center w-full md:w-1/2">
            <input
              type="text"
              className="rounded px-4 py-1 w-full bg-[#1f1f1f] border-none text-white text-center"
              value="Safe Zone"
            />
            <button className="bg-green-700 px-4 py-1 rounded">تاكيد</button>
          </div>
        </div>

        {/* Store Logo */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xl md:text-3xl font-bold">الشعار</p>
          <div className="flex flex-col md:flex-row items-center gap-5 w-full md:w-1/2">
            <img src="/logo.png" className="w-16 h-16" alt="store logo" />
            <label
              htmlFor="storelogo"
              className="bg-green-800 px-4 py-1 rounded cursor-pointer"
            >
              تغيير الشعار
            </label>
            <input type="file" id="storelogo" hidden />
            <p className="text-sm md:text-xl text-gray-500">
              JPG, GIF, PNG. 3MB MAX
            </p>
            <MdDelete className="text-red-500 cursor-pointer" size={30} />
          </div>
        </div>

        {/* Image Display */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xl md:text-3xl font-bold">عرض الصور</p>
          <div className="flex flex-wrap gap-3 md:gap-10 items-center">
            <button
              onClick={handleButtonClick}
              className="w-[100px] h-[100px] p-4 bg-[#1f1f1f] rounded-xl flex flex-col gap-2 justify-center items-center"
            >
              <BiPlus size={30} className="text-lime-700" />
            </button>
            {images?.map((image, index) => (
              <ImageHomeScreen
                key={index}
                categoryContext={categoryContext}
                image={image}
                api={api}
              />
            ))}
            {imageSrc && (
              <CropImage
                categoryContext={categoryContext}
                setImageSrc={setImageSrc}
                image={imageSrc}
                onCropComplete={handleCropComplete}
              />
            )}
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="flex justify-between items-center md:flex-row flex-col w-full">
          <p className="text-xl md:text-3xl font-bold">رأي العملاء</p>
          <div className="flex flex-wrap justify-center gap-2 items-center">
            <div className="bg-[#1f1f1f] p-5 rounded-lg flex flex-col gap-3 md:w-fit w-full">
              <div className="flex flex-col md:flex-row gap-3 items-center">
                <Avatar
                  src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fHx8&auto=format&fit=crop&w=687&q=80"
                  size="sm"
                />
                <input
                  type="text"
                  className="bg-[#5f5f5f] border-none text-center w-full md:w-auto"
                />
                <button className="bg-green-700 px-4 py-1 rounded">
                  تاكيد
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm md:text-xl">الرأي</p>
                <textarea className="bg-[#5f5f5f] p-2 border-none rounded text-center" />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-5">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-5 items-center bg-white p-3 rounded-xl w-full"
                >
                  <Avatar
                    src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fHx8&auto=format&fit=crop&w=687&q=80"
                    size="md"
                  />
                  <div className="flex flex-col gap-1 w-full md:w-auto">
                    <p className="text-black font-bold">امجد</p>
                    <p className="text-gray-600 text-sm md:text-base">
                      Lorem ipsum dolor sit amet...
                    </p>
                  </div>
                  <MdDelete className="text-red-500 cursor-pointer" size={30} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageImage;
