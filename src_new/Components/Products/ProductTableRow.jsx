import { Button, Input, useDisclosure } from "@chakra-ui/react";
import React, { useContext, useEffect, useState, useRef } from "react";
import { ProductsContextProvider } from "../../Contexts/ProductsContext";
import { CgSpinner } from "react-icons/cg";
import UpdateOrCreateProduct from "./UpdateOrCreateProduct";
import { server } from "../../Variables/pathes";
import { CiMenuKebab } from "react-icons/ci";

const ProductTableRow = ({
  product,
  selectedProducts,
  setSelectedProducts,
}) => {
  const [name, setName] = useState(product?.name);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [price, setPrice] = useState(product?.price);
  const [offer_price, setOfferPrice] = useState(product?.offer_price);
  const [stock, setStock] = useState(product?.stock);
  const [min_stock, setMinStock] = useState(product?.min_stock);
  const [rank, setRank] = useState(product?.rank);
  const [openUpdate, setOpenUpdate] = useState(false);
  const menuRef = useRef(null);

  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    setName(product?.name);
    setPrice(product?.price);
    setOfferPrice(product?.offer_price);
    setStock(product?.stock);
    setMinStock(product?.min_stock);
    setRank(product?.rank);
  }, [product]);

  const [isUpdated, setUpdated] = useState(false);
  const productsContext = useContext(ProductsContextProvider);
  const { handleDeleteProduct } = useContext(ProductsContextProvider);
  const loading = productsContext?.loading;
  const [open, setOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenMenuId]);

  return (
    <>
      <div className="flex justify-between w-full items-center p-3">
        <div className="flex lg:gap-32 md:gap-14 gap-3 items-center">
          <div className="relative" ref={menuRef}>
            <span
              className="cursor-pointer p-2"
              onClick={() =>
                setOpenMenuId(openMenuId === product?.id ? null : product?.id)
              }
            >
              <CiMenuKebab />
            </span>
            {openMenuId === product?.id && (
              <div className="bg-[#1f1f1f] p-2 rounded absolute top-8 left-1/3 transform -translate-x-1/2">
                <p
                  onClick={() => setOpen(true)}
                  className="mb-2 text-green-500 text-center hover:bg-green-700/30 cursor-pointer transition duration-500 text-xl rounded"
                >
                  Edit
                </p>
                <p
                  onClick={() => {
                    if (window.confirm("هل انت متأكد من حذف هذا الطلب؟")) {
                      handleDeleteProduct(product?.id);
                    }
                  }}
                  className="text-red-500 text-center hover:bg-red-700/30 cursor-pointer transition duration-500 text-xl px-2 rounded"
                >
                  Delete
                </p>
              </div>
            )}
          </div>
          <p>L.E {price}</p>
          <p>
            {stock > min_stock ? (
              <p className="text-green-600 bg-green-600/10 px-2 py-1 rounded">
                في المخزون
              </p>
            ) : stock <= min_stock ? (
              <p className="text-yellow-600 bg-yellow-600/10 px-2 py-1 rounded">
                كمية قليلة
              </p>
            ) : (
              <p className="text-red-600 bg-red-600/10 px-2 py-1 rounded">
                منتهي
              </p>
            )}
          </p>
          <p>{product?.created_at.split("T")[0]}</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex flex-col text-end">
            <p>{name}</p>
            <p className="text-sm text-gray-500">
              {product?.description.slice(0, 30)}
            </p>
          </div>
          <img src={server + product?.image1} className="w-12" alt="Product" />
          <input
            type="checkbox"
            className="border border-gray-500 bg-transparent text-green-700"
          />
        </div>
      </div>

      <UpdateOrCreateProduct
        isOpen={open}
        onClose={() => setOpen(false)}
        create={false}
        productID={open ? product?.id : null}
      />
    </>
  );
};

export default ProductTableRow;
