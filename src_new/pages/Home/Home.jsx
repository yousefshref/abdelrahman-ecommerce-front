import React from "react";
import Header from "../../Components/Header/Header";
import Products from "../../Components/Products/Products";
import CustomReviews from "../../Components/CustomersReviews/CustomReviews";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative">
      <Header />
      <Products />
      <CustomReviews />
      <Footer />


      <Link to={"https://wa.me/201093952937"}>
        <img loading="lazy" src="/whatsapp.png" className="wp-icon transition-all hover:scale-110 cursor-pointer fixed bg-white p-3 rounded-full bottom-5 w-[70px] shadow-xl right-5 z-50" alt="" />
      </Link>
    </div>
  );
};

export default Home;
