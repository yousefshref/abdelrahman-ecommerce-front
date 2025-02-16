import React from 'react'

import "./Loading.css"

const Loading = ({ absolute = false }) => {
    return (
        <div className={`
            fixed top-0 left-0 w-full h-screen flex justify-center items-center
            bg-white flex-col z-50
        `}>
            <img loading="lazy" className='w-[150px] animate-bounce' src="/logo.png" alt="" />
        </div>
    )
}

export default Loading
