import React, { useState, useCallback, useEffect, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utlies/cropUtils';

const CropImage = ({ image, onCropComplete, setImageSrc }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1); // Default zoom level
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [cropBoxSize, setCropBoxSize] = useState({ width: 150, height: 150 });

    const cropBoxRef = useRef(null);

    const onCropChange = setCrop;

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

    const handleFullSize = () => {
        const img = new Image();
        img.src = image;

        img.onload = () => {
            setCropBoxSize({ width: img.width, height: img.height });
        };
    };

    const handleResize = (e, direction) => {
        e.preventDefault();

        const isTouch = e.type === "touchstart";
        const initialX = isTouch ? e.touches[0].clientX : e.clientX;
        const initialY = isTouch ? e.touches[0].clientY : e.clientY;
        const initialWidth = cropBoxSize.width;
        const initialHeight = cropBoxSize.height;

        const onMove = (e) => {
            const currentX = isTouch ? e.touches[0].clientX : e.clientX;
            const currentY = isTouch ? e.touches[0].clientY : e.clientY;
            const deltaX = currentX - initialX;
            const deltaY = currentY - initialY;

            if (direction === "horizontal") {
                setCropBoxSize((prevSize) => ({
                    ...prevSize,
                    width: Math.max(50, initialWidth + deltaX),
                }));
            } else if (direction === "vertical") {
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

        const onEnd = () => {
            document.removeEventListener(isTouch ? "touchmove" : "mousemove", onMove);
            document.removeEventListener(isTouch ? "touchend" : "mouseup", onEnd);
        };

        document.addEventListener(isTouch ? "touchmove" : "mousemove", onMove);
        document.addEventListener(isTouch ? "touchend" : "mouseup", onEnd);
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
                onZoomChange={setZoom}
                onCropComplete={onCropCompleteInternal}
            />

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
                    onMouseDown={(e) => handleResize(e, "horizontal")}
                    onTouchStart={(e) => handleResize(e, "horizontal")}
                />
                <div
                    className="resize-handle"
                    onMouseDown={(e) => handleResize(e, "vertical")}
                    onTouchStart={(e) => handleResize(e, "vertical")}
                />
                <div
                    className="resize-handle corner"
                    onMouseDown={(e) => handleResize(e, "both")}
                    onTouchStart={(e) => handleResize(e, "both")}
                />
            </div>

            <button
                className="bg-blue-500 p-1 px-4 text-white absolute bottom-20 left-1/4 transform -translate-x-1/2 z-[1000000]"
                onClick={handleFullSize}
            >
                Full Size
            </button>

            <button
                className="bg-green-500 p-1 px-4 text-white absolute bottom-20 left-3/4 transform -translate-x-1/2 z-[1000000]"
                onClick={onCropConfirm}
            >
                Crop
            </button>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-[1000000]">
                <input
                    type="range"
                    min="0.5" // Allows zooming out to 50% size
                    max="3"   // Allows zooming in to 300% size
                    step="0.01"
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="zoom-slider"
                />
                <div className="text-center mt-2 text-white">
                    Zoom: {Math.round(zoom * 100)}%
                </div>
            </div>

            <style jsx>{`
                .crop-container {
                    position: fixed;
                    width: 100%;
                    height: 100%;
                    z-index: 9999;
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
                .zoom-slider {
                    width: 200px;
                }
            `}</style>
        </div>
    );
};

export default CropImage;
