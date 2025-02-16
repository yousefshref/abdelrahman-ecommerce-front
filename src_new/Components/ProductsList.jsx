import React from "react";
import ProductTableRow from "./Products/ProductTableRow";
import { useDisclosure } from "@chakra-ui/react";

const ProductsList = ({
  products,
  selectedProducts,
  setSelectedProducts,
  search,
  setSearch,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="bg-[#0f0f0f] p-4 mt-10 rounded-xl">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-full px-4 py-2 bg-[#2f2f2f] border-none text-white"
      />
      <div className="flex justify-between mt-5 bg-[#1f1f1f] p-2 rounded">
        <div className="flex flex-wrap gap-4 lg:gap-28 md:gap-10 items-center">
          <p className="text-emerald-300/50 font-light text-sm md:text-xl">
            Procedure
          </p>
          <p className="text-emerald-300/50 font-light text-sm md:text-xl">
            Price
          </p>
          <p className="text-emerald-300/50 font-light text-sm md:text-xl">
            Status
          </p>
          <p className="text-emerald-300/50 font-light text-sm md:text-xl">
            Created At
          </p>
        </div>
        <p className="text-emerald-300/50 flex gap-2 items-center font-light text-sm md:text-xl">
          Product{" "}
          <input
            type="checkbox"
            className="border border-gray-500 bg-transparent"
          />
        </p>
      </div>
      <div>
        {products?.map((product) => (
          <ProductTableRow
            key={product?.id}
            product={product}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
