import React, { useContext, useEffect } from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    CloseButton,
} from "@chakra-ui/react";
import { CartContextProvider } from '../../Contexts/CartContext';
import CartItem from '../Cart/CartItem';
import { Link } from 'react-router-dom';
import { cartPage } from '../../Variables/pathes';

const CartDrawer = ({ isOpen, onOpen, onClose }) => {

    const cartContext = useContext(CartContextProvider)

    const cart = cartContext?.cart

    useEffect(() => {
        cartContext?.getCart()
    }, [])

    return (
        <>
            <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={window.innerWidth < 768 ? "xs" : "lg"}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader className='font'>المنتجات في السلة</DrawerHeader>

                    <DrawerBody>
                        {cart?.map((product) => <CartItem key={product?.id} item={product} />)}
                    </DrawerBody>

                    <DrawerFooter className='font'>
                        <Button variant="outline" ml={3} onClick={onClose}>
                            تكملة التسوق
                        </Button>
                        <Link to={cartPage()}>
                            <Button colorScheme="green">الذهاب للدفع</Button>
                        </Link>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default CartDrawer;

