import React, { useContext, useEffect, useRef, useState } from 'react'
import { BiPlus, BiTrash } from 'react-icons/bi'
import { CategoryContextProvider } from '../Contexts/CategoryContext'
import { ProductsContextProvider } from '../Contexts/ProductsContext'

import ImageHomeScreen from './ImageHomeScreen/ImageHomeScreen'

import { api } from '../Variables/server'
import CropImage from './CropImage'

const HomePageImage = () => {
    const categoryContext = useContext(CategoryContextProvider)

    const images = categoryContext?.homePageImages

    useEffect(() => {
        categoryContext?.getHomePageImages()
    }, [])



    const [image, setImage] = useState(null);         // State to store the final cropped image file
    const [imageSrc, setImageSrc] = useState(null);    // State to hold the original image for cropping
    const fileInputRef = useRef(null);                 // Reference to trigger the hidden file input

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
                const croppedFile = new File([blob], 'cropped_image.jpg', { type: 'image/jpeg' });
                setImage(croppedFile);
                categoryContext?.createHomePageImage({ image: croppedFile }, () => { })
                setImageSrc(null); // Clear the cropping modal
            });
    };





    return (
        <div className='md:p-4 p-2 md:grid-cols-2 mt-14 rounded-xl w-full'>
            <p>تغيير الصور الرئيسية</p>
            <div className='mt-2 flex items-start flex-row md:gap-10 gap-5 w-full'>
                <div className='w-[140px]'>
                    {/* Hidden file input */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />

                    {/* Button to open file input */}
                    <button
                        onClick={handleButtonClick}
                        className='w-full h-[140px] p-4 bg-green-300 rounded-xl flex flex-col gap-2 justify-center items-center'
                    >
                        <BiPlus />
                    </button>
                </div>
                {images?.map(image => (
                    <ImageHomeScreen categoryContext={categoryContext} image={image} api={api} />
                ))}
                {/* Show CropImage component if an image is selected */}
                {imageSrc && <CropImage categoryContext={categoryContext} setImageSrc={setImageSrc} image={imageSrc} onCropComplete={handleCropComplete} />}
            </div>
        </div>
    )
}

export default HomePageImage
