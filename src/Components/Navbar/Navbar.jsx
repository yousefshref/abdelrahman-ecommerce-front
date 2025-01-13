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
import { adminOrders, cartPage, loginPagePath, productsPage, trackOrders, userProfile } from "../../Variables/pathes";
import { BiHelpCircle, BiLogIn } from "react-icons/bi";
import { MdOutlineSupportAgent } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { FiLogIn, FiShoppingCart } from "react-icons/fi";

const Navbar = ({ classes, profile }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cartContext = React.useContext(CartContextProvider)

  const cart = cartContext?.cart

  useEffect(() => {
    cartContext?.getCart()
  }, [])


  const userContext = React.useContext(AuthContextProvider)
  const user = userContext?.user


  return (
    <Box bg={useColorModeValue("white", "black")} px={window.innerWidth < 768 ? 1 : 4} className={`
    bg-amber-200 w-full ${profile ? "mb-0 pb-2 pt-2" : "mb-2 pb-2"} md:shadow-md shadow-sm
    ${classes}
    `}>
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

        <Box fontSize="xl" fontWeight="bold" className="md:w-[33.33%] flex md:justify-start justify-center">
          <Link to={'/'}>
            <img loading="lazy"
              src="/logo.png"
              alt="logo"
              width="60"
              height="60"
              className="min-w-[60px]"
            />
          </Link>
        </Box>

        {/* Desktop Menu */}
        <HStack as="nav" spacing={8} display={{ base: "none", md: "flex" }}>
          <Button variant="link">
            <Link to={productsPage()} onClick={onClose}>
              المنتجات
            </Link>
          </Button>
          <Button variant="link">
            <Link to={"https://linktr.ee/abdelrahamn"} onClick={onClose}>
              طلب المنتجات خارج مصر
            </Link>
          </Button>
          <Button variant="link">
            <Link to={trackOrders()} onClick={onClose}>
              تتبع شحنتك
            </Link>
          </Button>
          <Button variant="link">
            <Link to={"https://wa.me/201550158044"} onClick={onClose}>
              تدريب اونلاين
            </Link>
          </Button>
          <Button variant="link">
            <Link to={"https://wa.me/201093952937"} onClick={onClose}>
              الدعم
            </Link>
          </Button>
          <Button variant="link">
            <Link className="relative flex gap-2 items-center" to={cartPage()} onClick={onClose}>
              <IconButton
                className="flex justify-center"
                size="md"
                icon={<CiShoppingCart size={30} />}
              />
              <p className="bg-green-500 text-xs -top-1 -right-3 text-white p-2 absolute rounded-full flex flex-col justify-center items-center w-[20px] h-[20px]">{cart?.length}</p>
            </Link>
          </Button>
          <Button variant="link">
            {
              !user?.id ? (
                // <Link to={loginPagePath()} onClick={onClose}>
                <Link to={'https://wa.me/201093952937'} onClick={onClose}>
                  {/* <IconButton
                    className="flex justify-center"
                    size="md"
                    icon={<FiLogIn />}
                  /> */}
                  <IconButton
                    className="flex justify-center"
                    size="md"
                    icon={<BiHelpCircle />}
                  />
                </Link>
              ) : (
                user?.is_shipping_employee ? (
                  <Link to={adminOrders()} onClick={onClose}>
                    <IconButton
                      className="flex justify-center"
                      size="md"
                      icon={<RxDashboard />}
                    />
                  </Link>
                ) : (
                  <Link to={userProfile()} onClick={onClose}>
                    <img className="w-10 rounded-full my-auto" src="/profile_image.webp" alt="profile image" />
                  </Link>
                )
              )
            }
          </Button>
        </HStack>

        {/* Mobile Menu Icon */}
        <Flex className="w-[33.33%] flex justify-end" gap={2} display={{ base: "flex", md: "none" }}>
          <Link to={cartPage()} className="relative">
            <p className="bg-green-500 z-20 text-xs -top-1 -right-3 text-white p-2 absolute rounded-full flex flex-col justify-center items-center w-[20px] h-[20px]">{cart?.length}</p>
            <IconButton
              className="flex justify-center"
              size="md"
              icon={<FiShoppingCart />}
            />
          </Link>
          {
            !user?.id ? (
              <Link to={'https://wa.me/201093952937'} onClick={onClose}>
                {/* <IconButton
                  className="flex justify-center"
                  size="md"
                  icon={<FiLogIn />}
                /> */}
                <IconButton
                  className="flex justify-center"
                  size="md"
                  icon={<BiHelpCircle />}
                />
              </Link>
            ) : (
              user?.is_shipping_employee ? (
                <Link to={adminOrders()} onClick={onClose}>
                  <IconButton
                    className="flex justify-center"
                    size="md"
                    icon={<RxDashboard />}
                  />
                </Link>
              ) : (
                // <Link to={userProfile()} onClick={onClose}>
                //   <img className="w-10 rounded-full my-auto" src="/profile_image.webp" alt="profile image" />
                // </Link>
                null
              )
            )
          }
          {/* {user?.is_shipping_employee ? (
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
            <>
              {
                
              }
            </>
          } */}
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
                <Link to={productsPage()} onClick={onClose}>
                  المنتجات
                </Link>
              </Button>
              <Button variant="link">
                <Link to={"https://linktr.ee/abdelrahamn"} onClick={onClose}>
                  طلب المنتجات خارج مصر
                </Link>
              </Button>
              <Button variant="link">
                <Link to={trackOrders()} onClick={onClose}>
                  تتبع شحنتك
                </Link>
              </Button>
              <Button variant="link">
                <Link to={"https://wa.me/201550158044"} onClick={onClose}>
                  تدريب اونلاين
                </Link>
              </Button>
              <Button variant="link">
                <Link to={"https://wa.me/201093952937"} onClick={onClose}>
                  الدعم
                </Link>
              </Button>
              <Button variant="link">
                <Link className="flex gap-2 items-center" to={cartPage()} onClick={onClose}>
                  <p>{cart?.length}</p>
                  <CiShoppingCart size={25} />
                </Link>
              </Button>
              <Button variant="link">
                {/* <Link to={loginPagePath()} onClick={onClose}>
                  <BiLogIn size={25} />
                </Link> */}
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
