import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { CiShoppingCart } from "react-icons/ci";
import { ProductsContextProvider } from "../../Contexts/ProductsContext";
import ProductCard from "../../Components/Products/ProductCard";
import { CartContextProvider } from "../../Contexts/CartContext";

const ProductDetails = () => {

  const productsContext = useContext(ProductsContextProvider);

  const productDetails = productsContext?.product;

  const { id } = useParams();

  const handleFetchProduct = async (id) => {
    await productsContext?.fetchProduct(id);
  };

  useEffect(() => {
    handleFetchProduct(id);
  }, [id]);


  const products = productsContext?.products;

  const handleGetProducts = async () => {
    await productsContext?.fetchProducts();
  };

  useEffect(() => {
    handleGetProducts();
  }, []);


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);



  const cartsContext = useContext(CartContextProvider);

  const handleAddToCart = (product) => {
    cartsContext?.addToCart(product);
  };

  return (
    <div className="flex flex-col h-auto p-5 mb-5">

      {
        productsContext?.loading && (
          <div className="fixed z-10 bg-green-50 w-screen flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        )
      }

      <Navbar />
      <div className="w-full flex mt-10">
        {productDetails && (
          <div className="lg:flex-row flex flex-col-reverse justify-around items-center w-[100%]">
            <div className="md:w-1/2 w-full">
              <div>
                <h1
                  className="lg:text-5xl text-2xl font-bold text-right"
                  style={{ lineHeight: 1.2 }}
                >
                  {productDetails?.name}
                </h1>
                <div className="flex items-center gap-2 mt-4">
                  <p className="text-xl font-bold">{productDetails?.offer_price ? productDetails?.offer_price : productDetails?.price} EGP</p>
                  {
                    productDetails?.price && (
                      <small className="text-gray-500 line-through">بدلا من {productDetails?.price} EGP</small>
                    )
                  }
                </div>
              </div>
              <div className="flex items-center gap-5">
                <button onClick={() => handleAddToCart(productDetails)} className="bg-lime-500 transition-all duration-300 hover:bg-lime-600 active:bg-lime-700 text-white px-3 py-2 flex items-center gap-2 mt-5 w-full text-center justify-center">
                  <CiShoppingCart size={25} />
                  اضف الى السلة
                </button>
                <button className="bg-transparent transition-all duration-300 hover:bg-lime-100 hover:border-lime-100 hover:text-lime-700 active:bg-lime-200 border border-lime-500 text-lime-500 w-[100px] px-3 py-2 flex items-center gap-2 mt-5 text-center justify-center">
                  شراء
                </button>
              </div>
              <p className="mt-5 text-right text-gray-500">
                {productDetails?.description}
              </p>
            </div>
            <div className="md:w-1/2 w-full">
              <img
                src={productDetails?.images ? productDetails?.images[0] : ""}
                alt={productDetails?.name}
                className="w-full max-w-[400px] mx-auto bg-gray-100/30 p-5"
              /></div>
          </div>
        )}
      </div>
      <h1 className="md:text-5xl text-3xl text-lime-700 font-bold mt-20 text-center">منتجات مشابهة</h1>
      <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        {products?.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
