import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const AdminBox = ({ img, text, number }) => {
    return (
        <Box className='p-2 bg-white rounded-xl overflow-hidden shadow-lg h-[230px] relative'>
            <img
                style={{
                    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))"
                }}
                className='absolute -left-10 bottom-0 z-10 w-[200px] opacity-75' src={img} alt="" />
            <Flex direction={"column"} className='justify-center z-20 items-center h-full' gap={0}>
                <Text fontSize={window.innerWidth < 768 ? "2xl" : "4xl"} fontWeight={"extrabold"} className='z-30'>
                    {text}
                </Text>
                <Text fontSize={"2xl"} fontWeight={"bold"} className='z-30'>
                    {number}
                </Text>
            </Flex>
        </Box>
    )
}

export default AdminBox
