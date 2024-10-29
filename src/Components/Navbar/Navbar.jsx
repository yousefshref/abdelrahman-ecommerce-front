import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";

import { CartContextProvider } from "../../Contexts/CartContext";

import { cartPage, trackOrders } from '../../Variables/pathes'
import { IoIosHelpCircleOutline } from "react-icons/io";


const Navbar = () => {

  const cartContext = React.useContext(CartContextProvider)

  useEffect(() => {
    cartContext?.getCart()
  }, [])

  return (
    <nav className='flex font md:flex-row flex-col justify-between md:gap-10 gap-4 p-2 mb-5 items-center md:bg-white bg-gray-100'>
      <h1 className='text-2xl font-bold'>لوجو</h1>

      <ul className='flex min-w-fit md:flex-row flex-wrap gap-6 justify-center'>
        <li>طلب منتجات من خارج مصر</li>
        <li>
          <Link to={trackOrders()}>
            تتبع شحنتك
          </Link>
        </li>
        <li>للتدريب الأونلاين</li>
      </ul>

      <div className='flex flex-row gap-2'>
        <Link to={cartPage()} className='flex gap-1 items-center p-1 px-3 transition-all duration-300 hover:bg-gray-400 rounded-md hover:text-white'>
          <CiShoppingCart size={30} />
          <p>{cartContext?.cart?.length}</p>
        </Link>

        <div className='flex gap-1 items-center p-1 px-3 transition-all duration-300 hover:bg-gray-400 rounded-md hover:text-white'>
          <IoIosHelpCircleOutline size={27} />
          <p>الدعم</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
