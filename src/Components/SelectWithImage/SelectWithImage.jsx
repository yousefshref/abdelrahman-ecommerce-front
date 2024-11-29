import { useToast } from '@chakra-ui/react';
import React from 'react'

import Select from "react-select";
import { options } from '../../Variables/variables';

const SelectWithImage = ({ payment_method, setPaymentMethod }) => {
    const toast = useToast()
    return (
        <Select
            value={options?.find((option) => option.value === payment_method)} // Ensures the selected value matches
            placeholder="طريقة الدفع"
            className="w-full"
            onChange={(e) => {
                if (e?.value === "card") {
                    toast({
                        title: "تحذير",
                        description: "هذه الطريقة غير متوفرة في المتجر",
                        status: "warning",
                        duration: 3000, // 3 seconds
                        isClosable: true,
                        position: "bottom-left",
                        variant: "subtle", // Optional: softer effect
                    });
                } else {
                    setPaymentMethod(e?.value);
                }
            }}
            options={options}
        />
    )
}

export default SelectWithImage
