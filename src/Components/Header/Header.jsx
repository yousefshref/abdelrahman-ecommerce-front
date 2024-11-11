import Navbar from "../Navbar/Navbar";
import React, { useContext, useEffect } from "react";
import Slider from "../Slider/Slider";
import { CategoryContextProvider } from "../../Contexts/CategoryContext";
import { Link } from "react-router-dom";
import { productsPage } from "../../Variables/pathes";

const Header = () => {
  const categoryContext = useContext(CategoryContextProvider);

  const categories = categoryContext?.categories;

  useEffect(() => {
    categoryContext?.fetchCategories();
  }, []);
  return (
    <header className="md:p-5 p-1.5">
      <Navbar />
      <div className="p-2 flex gap-5 w-full flex-wrap justify-center">
        {categories?.map((category) => (
          <Link
            to={productsPage() + `?category=${category?.id}`}
            key={category?.id}
            className="px-3 py-1 rounded-full border-green-500 text-green-500 border cursor-pointer transition-all hover:bg-green-500 hover:text-white"
          >
            {category?.name}
          </Link>
        ))}
      </div>
      <div>
        <Slider />
      </div>
    </header>
  );
};

export default Header;
