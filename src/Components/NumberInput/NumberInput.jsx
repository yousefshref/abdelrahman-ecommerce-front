import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

const NumberInput = ({ value, setValue }) => {
    return (
        <div className='flex gap-4 items-center'>
            <span onClick={() => {
                setValue(value + 1)
            }} className='p-3 border rounded-full border-black cursor-pointer transition-all hover:bg-black/10 hover:border-black/10'>
                <FaPlus size={10} />
            </span>
            <input type="number" value={value} placeholder='1' className='w-[100px] text-center p-2 bg-white outline-none text-3xl' />
            <span onClick={() => {
                value > 1 && setValue(value - 1)
            }} className='p-3 border rounded-full border-black cursor-pointer transition-all hover:bg-black/10 hover:border-black/10'>
                <FaMinus size={10} />
            </span>
        </div>
    )
}

export default NumberInput
