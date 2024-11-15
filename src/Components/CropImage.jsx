import React, { useState, useCallback, useEffect, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utlies/cropUtils';

const CropImage = ({ image, onCropComplete, setImageSrc }) => {
    // const [crop, setCrop] = useState({ x: 0, y: 0 });
    // const [zoom, setZoom] = useState(1);
    // const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    // const onCropChange = setCrop;
    // const onZoomChange = setZoom;

    // const onCropCompleteInternal = useCallback((croppedArea, croppedAreaPixels) => {
    //     setCroppedAreaPixels(croppedAreaPixels);
    // }, []);

    // const onCropConfirm = async () => {
    //     const croppedImage = await getCroppedImg(image, croppedAreaPixels);
    //     onCropComplete(croppedImage);
    //     setImageSrc(null);
    // };


    // const [crop, setCrop] = useState({ x: 0, y: 0 });
    // const [zoom, setZoom] = useState(1);
    // const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    // const [isFreeform, setIsFreeform] = useState(false); // Toggle between freeform and fixed aspect ratio

    // const onCropChange = setCrop;
    // const onZoomChange = setZoom;

    // const onCropCompleteInternal = useCallback((croppedArea, croppedAreaPixels) => {
    //     setCroppedAreaPixels(croppedAreaPixels);
    // }, []);

    // const onCropConfirm = async () => {
    //     try {
    //         const croppedImage = await getCroppedImg(image, croppedAreaPixels);
    //         onCropComplete(croppedImage);
    //         setImageSrc(null);
    //     } catch (error) {
    //         console.error('Failed to crop image:', error);
    //     }
    // };

    // const toggleAspectRatio = () => {
    //     setIsFreeform((prev) => !prev);
    // };



    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [cropBoxSize, setCropBoxSize] = useState({ width: 150, height: 150 });

    const cropBoxRef = useRef(null);

    const onCropChange = setCrop;
    const onZoomChange = setZoom;

    const onCropCompleteInternal = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const onCropConfirm = async () => {
        try {
            const croppedImage = await getCroppedImg(image, croppedAreaPixels);
            onCropComplete(croppedImage);
            setImageSrc(null);
        } catch (error) {
            console.error('Failed to crop image:', error);
        }
    };

    // Handle resizing by mouse movement
    const handleResize = (e, direction) => {
        e.preventDefault();

        const initialX = e.clientX;
        const initialY = e.clientY;
        const initialWidth = cropBoxSize.width;
        const initialHeight = cropBoxSize.height;

        const onMouseMove = (e) => {
            const deltaX = e.clientX - initialX;
            const deltaY = e.clientY - initialY;

            if (direction === 'horizontal') {
                setCropBoxSize((prevSize) => ({
                    ...prevSize,
                    width: Math.max(50, initialWidth + deltaX),
                }));
            } else if (direction === 'vertical') {
                setCropBoxSize((prevSize) => ({
                    ...prevSize,
                    height: Math.max(50, initialHeight + deltaY),
                }));
            } else {
                setCropBoxSize({
                    width: Math.max(50, initialWidth + deltaX),
                    height: Math.max(50, initialHeight + deltaY),
                });
            }
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div className="crop-container w-full h-full left-0 top-0">
            <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={null} // Set to null for freeform cropping
                cropSize={cropBoxSize}
                onCropChange={onCropChange}
                onZoomChange={onZoomChange}
                onCropComplete={onCropCompleteInternal}
            />

            {/* Resizable crop box */}
            <div
                ref={cropBoxRef}
                className="resizable-crop-box"
                style={{
                    width: cropBoxSize.width,
                    height: cropBoxSize.height,
                }}
            >
                <div
                    className="resize-handle"
                    onMouseDown={(e) => handleResize(e, 'horizontal')}
                />
                <div
                    className="resize-handle"
                    onMouseDown={(e) => handleResize(e, 'vertical')}
                />
                <div
                    className="resize-handle corner"
                    onMouseDown={(e) => handleResize(e, 'both')}
                />
            </div>

            <button className='bg-blue-500 p-1 px-4 text-white absolute bottom-5 left-1/2 transform -translate-x-1/2' onClick={onCropConfirm}>Crop</button>

            <style jsx>{`
        .crop-container {
          position: fixed;
          width: 100%;
          height: 100%;
        }
        .resizable-crop-box {
          position: absolute;
          border: 2px dashed #00f;
          box-sizing: border-box;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .resize-handle {
          position: absolute;
          width: 10px;
          height: 10px;
          background: #00f;
          cursor: pointer;
        }
        .resize-handle.corner {
          right: 0;
          bottom: 0;
          cursor: nwse-resize;
        }
      `}</style>
        </div>
        // <div className="crop-container">
        //     <Cropper
        //         image={image}
        //         crop={crop}
        //         zoom={zoom}
        //         aspect={isFreeform ? null : 4 / 3} // Set aspect to null for freeform cropping
        //         onCropChange={onCropChange}
        //         onZoomChange={onZoomChange}
        //         onCropComplete={onCropCompleteInternal}
        //     />
        //     <button onClick={toggleAspectRatio} className='bg-blue-500 p-1 px-4 text-white absolute bottom-5 left-1/2 transform -translate-x-1/2'>
        //         Toggle {isFreeform ? 'Fixed Aspect' : 'Freeform Crop'}
        //     </button>
        //     <button onClick={onCropConfirm}>Crop</button>
        // </div>
        // <div className="crop-container">
        //     <Cropper
        //         image={image}
        //         crop={crop}
        //         zoom={zoom}
        //         aspect={isFreeform ? null : 4 / 3} // Set aspect to null for freeform cropping
        //         cropSize={initialCropSize}        // Set initial crop box dimensions
        //         onCropChange={onCropChange}
        //         onZoomChange={onZoomChange}
        //         onCropComplete={onCropCompleteInternal}
        //     />
        //     <button onClick={toggleAspectRatio} className='bg-blue-500 p-1 px-4 text-white absolute bottom-5 left-1/2 transform -translate-x-1/2'>
        //         Toggle {isFreeform ? 'Fixed Aspect' : 'Freeform Crop'}
        //     </button>
        //     <button onClick={onCropConfirm} className='bg-green-500 p-1 px-4 text-white absolute bottom-1 left-1/2 transform -translate-x-1/2'>Crop</button>
        // </div>
    );
};

export default CropImage;
