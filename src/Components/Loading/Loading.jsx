import React from 'react'

import "./Loading.css"

const Loading = () => {
    return (
        <div className='fixed top-0 left-0 w-full h-screen flex justify-center items-center'>
            <div className="loader">
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__ball"></div>
            </div>
        </div>
    )
}

export default Loading
