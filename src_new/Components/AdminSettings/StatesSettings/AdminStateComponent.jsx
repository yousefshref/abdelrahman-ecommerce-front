import React, { useEffect } from 'react'
import { StatesContextProvider } from '../../../Contexts/StatesContext'

const AdminStateComponent = ({ state, create, setOpenCreate }) => {
    const [name, setName] = React.useState(state?.name)
    const [shipping_price, setShippingPrice] = React.useState(state?.shipping_price)
    const [fast_shipping_price, setFastShippingPrice] = React.useState(state?.fast_shipping_price)
    const [rank, setRank] = React.useState(state?.rank)

    useEffect(() => {
        setName(state?.name)
        setShippingPrice(state?.shipping_price)
        setFastShippingPrice(state?.fast_shipping_price)
        setRank(state?.rank)
    }, [state])


    const [openUpdate, setOpenUpdate] = React.useState(false)

    const statesContext = React.useContext(StatesContextProvider)

    const [loading, setLoading] = React.useState(false)

    const handleUpdateState = async () => {
        setLoading(true)
        const data = {
            name,
            shipping_price,
            fast_shipping_price,
            rank
        }
        await statesContext?.updateState(state?.id, data, setOpenUpdate)
        setLoading(false)
    }

    const handleCreateState = async () => {
        setLoading(true)
        const data = {
            name,
            shipping_price,
            fast_shipping_price,
            rank
        }
        await statesContext?.createState(data, setOpenCreate)
        setLoading(false)
    }

    return (
        <div className='flex rounded-md shadow-md items-center justify-between flex-col p-2 bg-white relative'>
            {openUpdate || create ? (
                <input type="number" value={rank} onChange={(e) => setRank(e.target.value)} className='w-full text-center p-0.5 bg-white outline-none mb-1' placeholder='الترتيب' />
            ) : (
                <p>{state?.rank}</p>
            )}

            {openUpdate || create ? (
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='w-full text-center p-0.5 bg-white outline-none' />
            ) : (
                <p>{state?.name}</p>
            )}
            {
                openUpdate || create ? (
                    <div className='flex gap-2 items-center'>
                        <p>EGP</p>
                        <input type="number" value={shipping_price} onChange={(e) => setShippingPrice(e.target.value)} className='w-full text-center p-0.5 bg-white outline-none mt-1' />
                    </div>
                ) : (
                    <p>{state?.shipping_price}</p>
                )
            }
            <hr className='w-full my-1' />
            <div className='flex text-xs gap-2 items-center'>
                <p className='text-nowrap'>الشحن السريع:</p>
                {
                    openUpdate || create ? (
                        <input type="number" value={fast_shipping_price} onChange={(e) => setFastShippingPrice(e.target.value)} className='w-full text-center p-0.5 bg-white outline-none' />
                    ) : (
                        state?.fast_shipping_price ?
                            <p>{state?.fast_shipping_price} EGP</p>
                            :
                            <p className='text-red-500'>لا يوجد</p>
                    )
                }
            </div>
            <hr className='w-full my-1' />
            {loading ? (
                <p>جاري التحديث...</p>
            ) : (
                <div className='grid grid-cols-2 gap-2 mt-1'>
                    {
                        openUpdate || create ? (
                            <button onClick={create ? handleCreateState : handleUpdateState} className='border border-green-500 transition-all hover:bg-green-100 hover:border-green-100 rounded-sm text-green-500 p-1 px-3 text-xs w-full'>تم</button>
                        ) : (
                            <button onClick={() => setOpenUpdate(!openUpdate)} className='border border-blue-500 transition-all hover:bg-blue-100 hover:border-blue-100 rounded-sm text-blue-500 p-1 px-3 text-xs w-full'>تعديل</button>
                        )
                    }
                    <button onClick={() => {
                        statesContext?.deleteState(state?.id)
                    }} className='border border-red-500 transition-all hover:bg-red-100 rounded-sm hover:border-red-100 text-red-500 p-1 px-3 text-xs w-full'>حذف</button>
                </div>
            )}
        </div>
    )
}

export default AdminStateComponent
