import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { CartContextProvider } from '../../Contexts/CartContext'
import CartItem from '../../Components/Cart/CartItem'
import { StatesContextProvider } from '../../Contexts/StatesContext'
import { Modal, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { OrderContextProvider } from '../../Contexts/OrderContext'
import { CgSpinner } from 'react-icons/cg'
import { Link } from 'react-router-dom'

const Cart = () => {

  // modal
  const { isOpen, onOpen, onClose } = useDisclosure()


  // cart
  const cartContext = React.useContext(CartContextProvider)
  const cart = cartContext?.cart
  useEffect(() => {
    cartContext?.getCart()
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



  // shipping fees
  const [shippingFees, setShippingFees] = React.useState(0)

  const calculateShippingFees = () => {
    setShippingFees(states?.find(s => s?.id == state)?.shipping_price)
  }

  useEffect(() => {
    calculateShippingFees()
  }, [state])


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

  const handleCreateOrder = () => {
    const data = {
      name,
      phone_number,
      state,
      address,
      email,

      order_items: cart?.map(item => ({
        product: item?.id,
        quantity: item?.quantity
      }))
    }

    orderContext?.createOrder({ data })
  }



  return (
    <div className='font p-5'>
      <Navbar />

      <div className='flex flex-col gap-10 p-5 mt-10'>
        <div className='w-[100%] h-fit'>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 text-start min-w-[40%]">المنتج</th>
                <th className="py-2 text-start w-[20%]">السعر</th>
                <th className="py-2 text-start w-[20%]">الكمية</th>
                <th className="py-2 text-start w-[15%]">المجموع</th>
                <th className="py-2 text-start w-[5%]">حذف</th>
              </tr>
            </thead>
            <tbody>
              {cart?.length > 0 ? cart?.map((item, index) => (
                <CartItem key={item?.id} item={item} index={index} />
              )) : (
                <tr>
                  <td className="text-green-500 font-bold text-2xl py-2 text-start">لا يوجد منتجات في السلة</td>
                </tr>
              )}
              <Link to='/' className='mt-3 p-1 hover:bg-black/10 hover:border-black/10 px-4 transition-all duration-500 border-black border w-fit'>اكمل التسوق</Link>
            </tbody>
          </table>
        </div>


        {cart?.length > 0 && (
          <div className='flex gap-5 w-full md:flex-row flex-col'>
            <div className='md:min-w-[400px] w-full p-5 border border-black flex flex-col h-fit'>
              <strong className='text-2xl text-gray-500'>ملخص الطلب</strong>
              <ul className='flex flex-col mt-3'>
                {cart?.map((item, index) => (
                  <li key={item?.id} className='flex gap-2 justify-between my-2'>
                    <strong>{item?.name}:</strong>
                    <p>{item?.offer_price ? item?.offer_price * item?.quantity : item?.price * item?.quantity} EGP</p>
                  </li>
                ))}
                <li className='flex gap-2 justify-between my-2'>
                  <strong>الشحن:</strong>
                  <p>{shippingFees || 0} EGP</p>
                </li>
                <li className='flex gap-2 justify-between my-2'>
                  <strong>المجموع:</strong>
                  <p>{total} EGP</p>
                </li>
                <li className='flex gap-2 justify-between my-2'>
                  <button onClick={onOpen} className='p-1 py-2 px-4 transition-all duration-500 hover:bg-gray-800 bg-black text-white w-full'>اضف تفاصيل الشحن لطلب المنتج</button>
                </li>
              </ul>
            </div>


            <div className='flex flex-col w-full'>
              <strong className='text-2xl text-gray-500'>ملخص الشحن</strong>
              {!name ? (
                <div className='p-3 bg-yellow-100 mt-3 border border-yellow-700 text-yellow-700 flex flex-col justify-center items-center'>
                  <p>يجب ان تضف تفاصيل الشحن</p>
                </div>
              ) : (
                <ul className='flex flex-col mt-3'>
                  <li className='flex gap-2 my-2'>
                    <strong>الاسم:</strong>
                    <p>{name}</p>
                  </li>
                  <li className='flex gap-2 my-2'>
                    <strong>رقم الجوال:</strong>
                    <p>{phone_number}</p>
                  </li>
                  <li className='flex gap-2 my-2'>
                    <strong>المحافظة:</strong>
                    <p>{states?.find(s => s?.id == state)?.name}</p>
                  </li>
                  <li className='flex gap-2 my-2'>
                    <strong>العنوان:</strong>
                    <p>{address}</p>
                  </li>
                  <li className='flex gap-2 my-2'>
                    <strong>البريد الالكتروني:</strong>
                    <p>{email}</p>
                  </li>
                  <button onClick={handleCreateOrder} className='p-1 mt-3 py-2 px-4 transition-all duration-500 hover:bg-green-800 bg-green-500 text-white w-fit'>تاكيد الطلب</button>
                </ul>
              )}
            </div>
          </div>
        )}


        <Modal size='xl' isCentered isOpen={isOpen} onClose={() => {
          if (!name || !phone_number || !state || !address) {
            alert('يجب اضافة جميع الخانات (ماعدا البريد الالكتروني هو اختياري)')
          } else {
            onClose()
          }
        }}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader className='font'>اضف تفاصيل الشحن</ModalHeader>
            <div className='flex flex-col p-3 font'>
              <div className='flex flex-col'>
                <label htmlFor="name">الاسم</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-400 outline-none rounded-md p-2"
                  placeholder='مثال: يوسف شريف'
                />
              </div>
              <div className='flex flex-col mt-3'>
                <label htmlFor="phone_number">رقم الجوال</label>
                <input
                  type="text"
                  id="phone_number"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border border-gray-400 outline-none rounded-md p-2"
                  placeholder='مثال: 01234567890'
                />
              </div>
              <div className='flex flex-col mt-3'>
                <label htmlFor="state">المحافظة</label>
                <select
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="border border-gray-400 outline-none rounded-md p-2"
                >
                  <option value="">اختر المحافظة</option>
                  {states?.map(state => (
                    <option key={state?.id} value={state?.id}>{state?.name}</option>
                  ))}
                </select>
              </div>
              <div className='flex flex-col mt-3'>
                <label htmlFor="address">العنوان</label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border border-gray-400 outline-none rounded-md p-2"
                  placeholder='مثال: مدينة الشروق, اسكان مبارك الشباب 100 متر, عمارة 123'
                />
              </div>
              <div className='flex flex-col mt-3'>
                <label htmlFor="email">البريد الالكترونى <span className='text-gray-500 text-sm'>(في حالة لو تريد تتبع شحنتك مباشرة)</span></label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-400 outline-none rounded-md p-2"
                  placeholder='مثال: example@example.com'
                />
              </div>
              <button onClick={() => {
                if (orderLoading) {

                } else {
                  if (!name || !phone_number || !state || !address) {
                    alert('يجب اضافة جميع الخانات (ماعدا البريد الالكتروني هو اختياري)')
                  } else {
                    onClose()
                  }
                }
              }} className='p-1 py-2 px-4 transition-all duration-500 hover:bg-gray-800 bg-black text-white w-fit mt-3'>
                {
                  orderLoading ? (
                    <span className='flex items-center gap-2 animate-spin'>
                      <CgSpinner />
                    </span>
                  ) : "تم"
                }
              </button>
            </div>
          </ModalContent>
        </Modal>

      </div>

    </div>
  )
}

export default Cart
