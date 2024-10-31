import React, { useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  useColorModeValue,
  HStack,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { CartContextProvider } from "../../Contexts/CartContext";
import { cartPage } from "../../Variables/pathes";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cartContext = React.useContext(CartContextProvider)

  const cart = cartContext?.cart

  useEffect(() => {
    cartContext?.getCart()
  }, [])

  return (
    <Box bg={useColorModeValue("white", "black")} px={4} className="mb-10">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box fontSize="xl" fontWeight="bold">
          <img
            src="/logo.png"
            alt="logo"
            width="60"
            height="60"
          />
        </Box>

        {/* Desktop Menu */}
        <HStack as="nav" spacing={8} display={{ base: "none", md: "flex" }}>
          <Button variant="link">
            <Link to={"/"} onClick={onClose}>
              المنتجات
            </Link>
          </Button>
          <Button variant="link">
            <Link to={"/"} onClick={onClose}>
              طلب المنتجات خارج مصر
            </Link>
          </Button>
          <Button variant="link">
            <Link to={"/"} onClick={onClose}>
              تتبع شحنتك
            </Link>
          </Button>
          <Button variant="link">
            <Link to={"/"} onClick={onClose}>
              تدريب اونلاين
            </Link>
          </Button>
          <Button variant="link">
            <Link className="flex gap-2 items-center" to={cartPage()} onClick={onClose}>
              <p>{cart?.length}</p>
              <CiShoppingCart size={25} />
            </Link>
          </Button>
        </HStack>

        {/* Mobile Menu Icon */}
        <IconButton
          size="md"
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={onOpen}
        />
      </Flex>

      {/* Right-side Drawer for Mobile Menu */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Stack as="nav" spacing={4} mt={8}>
              <Button variant="link">
                <Link to={"/"} onClick={onClose}>
                  المنتجات
                </Link>
              </Button>
              <Button variant="link">
                <Link to={"/"} onClick={onClose}>
                  طلب المنتجات خارج مصر
                </Link>
              </Button>
              <Button variant="link">
                <Link to={"/"} onClick={onClose}>
                  تتبع شحنتك
                </Link>
              </Button>
              <Button variant="link">
                <Link to={"/"} onClick={onClose}>
                  تدريب اونلاين
                </Link>
              </Button>
              <Button variant="link">
                <Link className="flex gap-2 items-center" to={cartPage()} onClick={onClose}>
                  <p>{cart?.length}</p>
                  <CiShoppingCart size={25} />
                </Link>
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
