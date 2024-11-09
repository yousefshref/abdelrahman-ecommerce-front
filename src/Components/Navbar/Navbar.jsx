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
import { AuthContextProvider } from "../../Contexts/AuthContext";
import { adminOrders, cartPage, trackOrders } from "../../Variables/pathes";
import { BiHelpCircle } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cartContext = React.useContext(CartContextProvider)

  const cart = cartContext?.cart

  useEffect(() => {
    cartContext?.getCart()
  }, [])


  const userContext = React.useContext(AuthContextProvider)
  const user = userContext?.user
  useEffect(() => {
    userContext?.getUser()
  }, [])
    ;


  return (
    <Box bg={useColorModeValue("white", "black")} px={window.innerWidth < 768 ? 1 : 4} className="bg-amber-200 w-full">
      <Flex h={16} alignItems="center" justifyContent="space-between">

        <Box
          display={{ md: "none" }}
          className="w-[33.33%]"
        >
          <IconButton
            size="md"
            icon={<HamburgerIcon />}
            aria-label="Open Menu"
            onClick={onOpen}
          />
        </Box>

        <Box fontSize="xl" fontWeight="bold" className="w-[33.33%] flex md:justify-start justify-center">
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
            <Link to={trackOrders()} onClick={onClose}>
              تتبع شحنتك
            </Link>
          </Button>
          <Button variant="link">
            <Link to={"/"} onClick={onClose}>
              تدريب اونلاين
            </Link>
          </Button>
          {user?.is_shipping_employee && (
            <Button variant="link">
              <Link to={adminOrders()} onClick={onClose}>
                الداشبورد
              </Link>
            </Button>
          )}
          <Button variant="link">
            <Link className="relative flex gap-2 items-center" to={cartPage()} onClick={onClose}>
              <p className="bg-green-500 text-xs -top-1 -right-3 text-white p-2 absolute rounded-full flex flex-col justify-center items-center w-[20px] h-[20px]">{cart?.length}</p>
              <CiShoppingCart size={30} />
            </Link>
          </Button>
        </HStack>

        {/* Mobile Menu Icon */}
        <Flex className="w-[33.33%] flex justify-end" gap={2} display={{ base: "flex", md: "none" }}>
          <Link to={cartPage()}>
            <IconButton
              className="flex justify-center"
              size="md"
              icon={<FiShoppingCart />}
            />
          </Link>
          {user?.is_shipping_employee ? (
            <Button variant="link">
              <Link to={adminOrders()} onClick={onClose}>
                <IconButton
                  className="flex justify-center"
                  size="md"
                  icon={<RxDashboard />}
                />
              </Link>
            </Button>
          ) :
            <IconButton
              className="flex justify-center"
              size="md"
              icon={<BiHelpCircle />}
            />
          }
        </Flex>
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
