import React from 'react'

import "./Loading.css"

const Loading = () => {
    return (
        <div className='fixed top-0 left-0 w-full h-screen flex justify-center items-center'>
            <img loading="lazy" className='w-[150px] animate-bounce' src="/logo.png" alt="" />
        </div>
    )
}

export default Loading
