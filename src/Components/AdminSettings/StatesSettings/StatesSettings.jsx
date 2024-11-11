import { Button } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { StatesContextProvider } from '../../../Contexts/StatesContext'
import AdminStateComponent from './AdminStateComponent'

const StatesSettings = () => {
    const statesContext = useContext(StatesContextProvider)

    const states = statesContext?.states

    useEffect(() => {
        statesContext?.getStates()
    }, [])

    const [openCreate, setOpenCreate] = React.useState(false)
    return (
        <div className='mt-5 p-2 bg-white shadow-lg'>
            <div className='flex items-center justify-between'>
                <h3 className='text-xl'>المحافظات المتاحة للشحن</h3>
                <Button onClick={() => setOpenCreate(true)} colorScheme='blue' size={'sm'}>
                    اضافة محافظة
                </Button>
            </div>
            <div className='p-2 bg-gray-200 mt-5 rounded-md grid md:grid-cols-6 grid-cols-3 gap-4'>
                {states?.map((state) => (
                    <AdminStateComponent key={state?.id} state={state} />
                ))}
                {openCreate && (
                    <AdminStateComponent create={true} setOpenCreate={setOpenCreate} />
                )}
            </div>
        </div>
    )
}

export default StatesSettings
