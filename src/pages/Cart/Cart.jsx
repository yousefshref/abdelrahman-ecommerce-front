import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { CartContextProvider } from '../../Contexts/CartContext'
import CartItem from '../../Components/Cart/CartItem'
import { StatesContextProvider } from '../../Contexts/StatesContext'
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormControl, Input, Select, Switch, Text, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import { OrderContextProvider } from '../../Contexts/OrderContext'
import { Form, Link } from 'react-router-dom'
import { initDB } from '../../Utlis/initDB'

import Loading from '../../Components/Loading/Loading'
import { CgClose } from 'react-icons/cg'
import { FaAngleDown, FaAngleUp, FaChevronDown } from 'react-icons/fa'

const Cart = () => {

  const toast = useToast()

  // modal
  const { isOpen, onOpen, onClose } = useDisclosure()


  // cart
  const cartContext = React.useContext(CartContextProvider)
  const cart = cartContext?.cart

  const [cartLoading, setCartLoading] = React.useState(true)

  const handleGetCart = async () => {
    setCartLoading(true)
    await cartContext?.getCart()
    setCartLoading(false)
  }
  useEffect(() => {
    handleGetCart()
  }, [])

  // states
  const statesContext = React.useContext(StatesContextProvider)
  const states = statesContext?.states
  useEffect(() => {
    statesContext?.getStates()
  }, [])




  // shipping details
  const [name, setName] = React.useState('')
  const [phone_number, setPhoneNumber] = React.useState('')
  const [state, setState] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [email, setEmail] = React.useState('')

  const [selectedOption, setSelectedOption] = useState({
    label: "اختر طريقة الدفع",
    img: "/atm-card.png",
  });

  const [is_fast_shipping, setIsFastShipping] = React.useState(false)

  const [checkValidation, setCheckValidation] = useState(false)



  useEffect(() => {
    if (!name ||
      !phone_number ||
      !state ||
      !address ||
      selectedOption.label == "اختر طريقة الدفع" ||
      phone_number.length < 11) {
      setCheckValidation(true)
    } else {
      setCheckValidation(false)
    }
  }, [name, phone_number, state, address, selectedOption.label, phone_number.length, address])
  // shipping fees
  const [shippingFees, setShippingFees] = React.useState(0)

  const calculateShippingFees = () => {
    setShippingFees(states?.find(s => s?.id == state)?.shipping_price)
    if (is_fast_shipping) {
      setShippingFees(Number(states?.find(s => s?.id == state)?.shipping_price) + Number(states?.find(s => s?.id == state)?.fast_shipping_price))
    }
  }

  useEffect(() => {
    calculateShippingFees()
  }, [state, is_fast_shipping])


  const [stateDetails, setStateDetails] = React.useState(null)

  const getState = () => {
    setStateDetails(states?.find(s => s?.id == state))
  }

  useEffect(() => {
    getState()
  }, [state])


  useEffect(() => {
    if (!stateDetails?.is_fast_shipping) {
      setIsFastShipping(false)
    }
  }, [stateDetails])


  const [total, setTotal] = React.useState(0)

  const calculateTotal = () => {
    let total = 0
    cart?.forEach(item => {
      total += item?.offer_price ? item?.offer_price * item?.quantity : item?.price * item?.quantity
    })
    if (shippingFees) {
      setTotal(total + shippingFees)
    } else {
      setTotal(total)
    }
  }

  useEffect(() => {
    calculateTotal()
  }, [cart, shippingFees])






  // create order
  const orderContext = React.useContext(OrderContextProvider)

  const orderLoading = orderContext?.loading

  const [loading, setLoading] = React.useState(false)

  const handleCreateOrder = async () => {
    setLoading(true)
    const data = {
      name,
      phone_number,
      state,
      address,
      email,
      is_fast_shipping,
      total,

      order_items: cart?.map(item => ({
        product: item?.id,
        quantity: item?.quantity
      }))
    }

    await orderContext?.createOrder({ data }).then(async () => {
      const db = await initDB();
      await db.clear('cart');
    })
    setLoading(false)
  }




  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = [
    {
      label: "الدفع عند الاستلام",
      img: "/cash-on-delivery.png",
    },
    {
      label: "دفع ببطاقة الائتمان",
      img: "/visa.png",
      img2: "/money.png",
      disabled: true
    },
    {
      label: "دفع انستا باي او محفظة الكترونية",
      img: "/Asset-6@4x-1024x125.png",
      img2: "/ewallet.png",
      disabled: true,
      imageClass: "w-14 bg-indigo-500 p-1"
    },
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    setSelectedOption(options[0]);
  }, [selectedOption.label])


  // loading
  if (cartLoading) {
    return <Loading />
  }

  return (
    <div className='font p-5'>
      <Navbar />

      {cart?.length > 0 ? (
        <div className='flex md:flex-row flex-col-reverse gap-10 md:p-5 p-2 mt-10'>
          <div className='lg:w-[calc(100%-500px)] md:w-[calc(100%-300px)] w-full flex flex-col'>
            <Link to='/' className='p-1 mb-2 hover:bg-black/10 hover:border-black/10 px-4 transition-all duration-500 border-black border w-fit'>اكمل التسوق</Link>
            <div className='flex flex-col gap-2'>
              {
                cart?.map((item, index) => (
                  <CartItem
                    key={item?.id}
                    item={item}
                  />
                ))
              }
            </div>
          </div>

          {/* products total and details */}
          <Box className='lg:w-[500px] md:w-[300px] w-full border p-5 border-gray-500'>
            <Flex direction={'column'} gap={'2'}>
              <strong className='text-green-500'>تفاصيل المنتجات</strong>
              <hr />
              {cart?.map((item, index) => (
                <Flex gap={'2'} key={item?.id} justifyContent={'space-between'} alignItems={'center'} className='py-2'>
                  <Text>{item?.name}: </Text>
                  <strong>{item?.offer_price ? item?.offer_price * item?.quantity : item?.price * item?.quantity} EGP</strong>
                </Flex>
              ))}
              <div className='mt-2' />
              <strong className='text-green-500'>الاجمالي</strong>
              <hr />
              <div className='flex gap-3 items-center'>
                <p>اجمالي السعر:</p>
                <strong>{total} EGP</strong>
              </div>
              <div className='flex gap-3 items-center'>
                <p>سعر الشحن:</p>
                <strong>{shippingFees ? shippingFees : 0} EGP</strong>
              </div>
              <div className='mt-2' />
              <Button
                onClick={checkValidation ? onOpen : handleCreateOrder}
                className='w-full'
                colorScheme='green'
                isLoading={loading}
                variant={checkValidation ? 'outline' : "solid"}
              >
                {
                  checkValidation ? "تأكيد الطلب" : "اطلب المنتجات الأن"
                }
              </Button>
            </Flex>
          </Box>
        </div>
      ) : (
        <div className='flex flex-col gap-2 relative justify-center items-center'>
          <img loading="lazy" src="/empty_cart.png" alt="" className='md:block hidden' />
          <img loading="lazy" src="/empty_cart_mobile.png" alt="" className='md:hidden block' />
          <Link to='/' className='absolute md:right-[4vw] right-[50%] md:-translate-x-[0%] -translate-x-[-50%] md:top-[34vw] md:bottom-[0vw] h-fit bottom-[25vw] p-1 mb-2 hover:bg-black/10 hover:border-black/10 px-4 transition-all duration-500 border-black border w-fit'>اكمل التسوق</Link>
        </div>
      )}

      {/* Drawer */}
      <Drawer
        size='md'
        isOpen={isOpen}
        placement='right'
        onClose={() => {
          onClose()
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }}
      >
        <DrawerOverlay />
        <DrawerContent className='relative'>
          <CgClose className='absolute top-3 left-3 text-2xl cursor-pointer text-red-500' onClick={() => {
            onClose()
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          }} />

          <DrawerHeader className='font'>تفاصيل الشحن</DrawerHeader>

          <DrawerBody>
            <div className='flex flex-col gap-4 font'>
              <div className='flex flex-col gap-2'>
                <div className='flex gap-2 items-center'>
                  <p>الاسم</p>
                  <p className='text-red-500'>*</p>
                </div>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='مثال: يوسف شريف محمد'
                  aria-label='name'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <div className='flex gap-2 items-center'>
                  <p>رقم الهاتف</p>
                  <p className='text-red-500'>*</p>
                </div>
                <Input
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder='مثال: 01012345678'
                  aria-label='phone_number'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <div className='flex gap-2 items-center'>
                  <p>المدينة</p>
                  <p className='text-red-500'>*</p>
                </div>
                <select
                  placeholder='مثال: القاهرة'
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value={""}>{"اختر المدينة"}</option>
                  {states?.map((state) => (
                    <option key={state?.id} value={state?.id}>{state?.name}</option>
                  ))}
                </select>
              </div>


              <div className='flex flex-col gap-2 p-1 px-2 bg-gray-100 rounded-xl'>
                <div className='flex gap-2 items-center'>
                  <p>هل تريد شحن سريع ؟</p>
                </div>
                <Switch
                  isChecked={is_fast_shipping}
                  onChange={() => setIsFastShipping(!is_fast_shipping)}
                  isDisabled={!stateDetails?.fast_shipping_price}
                />
                <small className='text-gray-500'>
                  {stateDetails?.fast_shipping_price ? `سعر الشحن: ${stateDetails?.fast_shipping_price} EGP إضافية` : "لا يوجد شحن سريع"}
                </small>
              </div>

              <div className='flex flex-col gap-2'>
                <div className='flex gap-2 items-center'>
                  <p>العنوان</p>
                  <p className='text-red-500'>*</p>
                </div>
                <Textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder='مثال: الرياض الجديدة'
                  aria-label='address'
                />
              </div>


              <div className='flex flex-col gap-2'>
                <div className='flex gap-2 items-center'>
                  <p>البريد الالكتروني</p>
                </div>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='اكتب الايميل لو تريد تتبع الشحنه'
                  aria-label='email'
                />
              </div>


              <div className="relative w-full">
                {/* Selected Option */}
                <div
                  className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={selectedOption.img}
                      alt={selectedOption.label}
                      className="w-5 h-5"
                    />
                    <span>{selectedOption.label}</span>
                  </div>
                  {isDropdownOpen ? (
                    <FaAngleUp className="text-gray-500" />
                  ) : (
                    <FaAngleDown className="text-gray-500" />
                  )}
                </div>

                {/* Dropdown Options */}
                {isDropdownOpen && (
                  <div className="absolute left-0 w-full mt-2 bg-white border border-gray-300 rounded shadow-lg">
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className={`
                          flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100
                          ${option.disabled ? "opacity-50 cursor-not-allowed" : ""}
                          `}
                        onClick={() => {
                          if (option.disabled) {
                            toast({
                              title: 'خطأ',
                              description: 'هذه طريقة الدفع غير متوفرة الأن',
                              status: 'error',
                              duration: 3000,
                              isClosable: true,
                              position: 'bottom-left',
                              variant: 'subtle',
                            })
                          } else {
                            handleOptionSelect(option)
                          }
                        }}
                      >
                        <img
                          src={option.img}
                          alt={option.label}
                          className={option.imageClass ? option.imageClass : "w-10"}
                        />
                        {option.img2 ? (
                          <img
                            src={option.img2}
                            alt={option.label}
                            className={option?.imageClass2 ? option?.imageClass2 : "w-10"}
                          />
                        ) : null}
                        <span>{option.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* <div className='flex flex-col'>
                <div className='flex gap-2 items-center'>
                  <input checked={true} type="checkbox" />
                  <div className='flex gap-1 items-center'>
                    <img className='w-10' src="/cash-on-delivery.png" alt="" />
                    <p>الدفع عند الاستلام</p>
                  </div>
                </div>
                <div className='flex gap-2 items-center opacity-50'>
                  <input type="checkbox" disabled />
                  <div className='flex gap-1 items-center'>
                    <img className='w-10' src="/visa.png" alt="" />
                    <img className='w-10' src="/money.png" alt="" />
                    <p>دفع ببطاقة الائتمان</p>
                  </div>
                </div>
                <div className='flex gap-2 items-center opacity-50'>
                  <input type="checkbox" disabled />
                  <div className='flex gap-1 items-center'>
                    <img className='w-24 p-1 bg-indigo-500' src="/Asset-6@4x-1024x125.png" alt="" />
                    <p>دفع انستا باي</p>
                  </div>
                </div>
              </div> */}
            </div>
          </DrawerBody>

          <DrawerFooter className='flex gap-3'>
            <Button
              isLoading={loading}
              loadingText='جاري اضافة الطلب'
              colorScheme='green'
              disabled={checkValidation}
              onClick={() => {
                onClose()
                window.scrollTo({
                  top: 0,
                  behavior: "smooth"
                });
              }}
            >
              تــــم
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Cart
