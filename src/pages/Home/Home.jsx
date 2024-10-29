import React from "react";
import Header from "../../Components/Header/Header";
import Products from "../../Components/Products/Products";
import CustomReviews from "../../Components/CustomersReviews/CustomReviews";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <Products />
      <CustomReviews />
      <Footer />
    </div>
  );
};

export default Home;
