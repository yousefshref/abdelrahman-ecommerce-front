import React, { useContext, useEffect, useState } from 'react'
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { CategoryContextProvider } from '../../Contexts/CategoryContext'


const UpdateOrCreateCategory = ({ isOpen, onClose, category }) => {

    const categoryContext = useContext(CategoryContextProvider)


    const [loading, setLoading] = useState(false)

    const [name, setName] = useState('')

    const handleCreate = async () => {
        const data = { name }
        try {
            setLoading(true)
            await categoryContext.createCategory({ data }, onClose)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        if (category) {
            setName(category?.name)
        } else {
            setName('')
        }
    }, [category])


    const handleUpdate = async () => {
        const data = { name }
        try {
            setLoading(true)
            await categoryContext.updateCategory(category.id, data, onClose)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal size={"md"} isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent className='font h-full max-h-[200px] overflow-y-scroll'>
                <ModalHeader className='text-lime-700'>
                    {
                        category ? "تعديل الفئة" : "أضافة فئة جديدة"
                    }
                </ModalHeader>
                <ModalBody className='flex flex-col gap-7'>
                    <Input onChange={(e) => setName(e.target.value)} value={name} className='text-xl' placeholder='اسم الفئة' />
                    <Button
                        onClick={() => {
                            if (category) {
                                handleUpdate()
                            } else {
                                handleCreate()
                            }
                        }}
                        className='bg-lime-700'
                        isLoading={loading}
                        isDisabled={loading}
                    >
                        حفظ
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default UpdateOrCreateCategory
