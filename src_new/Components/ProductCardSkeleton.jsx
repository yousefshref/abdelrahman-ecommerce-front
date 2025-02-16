import React from 'react'

const ProductCardSkeleton = () => {
    return (
        <div className="border border-gray-200 rounded-lg p-4 max-w-xs w-full mx-auto shadow-md">
            {/* Image Skeleton */}
            <div className="bg-gray-200 h-40 rounded-md mb-4"></div>

            {/* Title Skeleton */}
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>

            {/* Subtitle Skeleton */}
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>

            {/* Button Skeletons */}
            <div className="flex justify-between items-center space-x-4">
                <div className="h-10 w-1/2 bg-gray-200 rounded-md"></div>
                <div className="h-10 w-1/2 bg-gray-200 rounded-md"></div>
            </div>

            {/* Price Skeleton */}
            <div className="h-6 bg-gray-200 rounded w-1/4 mt-4"></div>
        </div>
    )
}

export default ProductCardSkeleton
