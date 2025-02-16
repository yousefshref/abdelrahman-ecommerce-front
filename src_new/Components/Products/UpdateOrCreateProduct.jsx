import React, { useContext, useEffect, useState } from "react";

import {
  Modal,
  ModalBody,
  ModalContent,
  Button,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { CategoryContextProvider } from "../../Contexts/CategoryContext";
import { ProductsContextProvider } from "../../Contexts/ProductsContext";
import { CiTrash } from "react-icons/ci";

import { server } from "../../Variables/pathes";

const UpdateOrCreateProduct = ({ isOpen, onClose, create, productID }) => {
  const productsContext = useContext(ProductsContextProvider);
  const product = productsContext?.product;

  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(product?.price);
  const [offer_price, setOfferPrice] = useState(product?.offer_price);
  const [stock, setStock] = useState(product?.stock);
  const [min_stock, setMinStock] = useState(product?.min_stock);
  const [related_products, setRelatedProducts] = useState([]);

  const [cropImageSrc, setCropImageSrc] = useState(null);
  const [imageSlot, setImageSlot] = useState(null);

  const categoryContext = useContext(CategoryContextProvider);
  const categories = categoryContext?.categories;

  const { fetchCategories } = useContext(CategoryContextProvider);
  const [opend, setOpend] = useState(false);
  useEffect(() => {
    if (isOpen && !opend) {
      fetchCategories();
      setOpend(true);
    }
  }, [isOpen, opend]);

  useEffect(() => {
    if (productID && isOpen) {
      productsContext?.fetchProduct(productID);
    }
  }, [productID]);

  useEffect(() => {
    if (product && !create) {
      setName(product?.name);
      setDescription(product?.description);
      setCategory(product?.category);
      setPrice(product?.price);
      setOfferPrice(product?.offer_price);
      setStock(product?.stock);
      setMinStock(product?.min_stock);
      setImage1(product?.image1);
      setImage2(product?.image2);
      setImage3(product?.image3);
      setImage4(product?.image4);
      setRelatedProducts(product?.related_products);
    } else {
      setImage1("");
      setImage2("");
      setImage3("");
      setImage4("");
      setName("");
      setDescription("");
      setCategory("");
      setPrice(0);
      setOfferPrice(0);
      setStock(0);
      setMinStock(0);
      setRelatedProducts([]);
    }
  }, [product, create]);

  const [loading, setLoading] = useState(false);

  const handleSaveProduct = async () => {
    setLoading(true);
    const data = {
      image1,
      image2,
      image3,
      image4,
      name,
      description,
      category,
      price,
      offer_price,
      stock,
      min_stock,
      related_products_data: String(related_products),
    };
    if (!name || !description || !category || !price || !stock) {
      alert("املى الخانات المعلمة بالنجوم");
    } else {
      await productsContext?.createProduct(data).then((e) => {
        onClose();
      });
    }
    setLoading(false);
  };

  const handleUpdateProduct = async () => {
    setLoading(true);
    const data = {
      name,
      description,
      category,
      price,
      offer_price,
      stock,
      min_stock,
      related_products_data: String(related_products),
    };

    if (typeof image1 === "object" || image1 == "") {
      data.image1 = image1;
    }
    if (typeof image2 === "object" || image2 == "") {
      data.image2 = image2;
    }
    if (typeof image3 === "object" || image3 == "") {
      data.image3 = image3;
    }
    if (typeof image4 === "object" || image4 == "") {
      data.image4 = image4;
    }

    await productsContext
      ?.updateProduct(product?.id, data, onClose)
      .then((e) => {
        if (e?.id) {
          // setImages(e?.images)
          setImage1(e?.image1);
          setImage2(e?.image2);
          setImage3(e?.image3);
          setImage4(e?.image4);
          setName(e?.name);
          setDescription(e?.description);
          setCategory(e?.category);
          setPrice(e?.price);
          setOfferPrice(e?.offer_price);
          setStock(e?.stock);
          setMinStock(e?.min_stock);
          setRelatedProducts(e?.related_products);
        }
      });
    setLoading(false);
  };

  const products = productsContext?.products;

  // category
  const categoryDisclosure = useDisclosure();

  const base64ToFile = (base64, filename) => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const productDetails = productsContext?.product;

  return (
    <Modal size={"screen"} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        className="font h-full max-h-[90vh] overflow-y-scroll p-5"
        style={{ background: "#1f1f1f" }}
      >
        <ModalHeader className="text-white flex justify-between items-center">
          {/* {create ? "أضافة منتج جديد" : "تعديل منتج"} */}
          <div className="flex gap-2 items-center">
            <div className="bg-green-900 w-3 h-2"></div>
            التفاصيل الاساسية
          </div>
          <div>
            <p className="text-2xl text-center">ID: {product?.id}</p>
            <p className="text-gray-200 text-sm text-center">
              {product?.created_at?.split("T")[0]}
            </p>
          </div>
        </ModalHeader>
        <ModalBody className="flex flex-col gap-7">
          {/* <div className="flex flex-col gap-3">
            <strong>تفاصيل اساسية</strong>
            <div className="flex flex-col gap-2">
              <div className="w-full p-1 overflow-x-scroll flex gap-5 items-center max-w-full">
                <button className="p-2 relative min-w-[50px] h-[50px] bg-gray-300 transition-all hover:bg-gray-200 active:bg-gray-300 flex flex-col items-center justify-center">
                  <input
                    type="file"
                    className="w-full opacity-0 absolute h-full left-0 top-0"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {


                        if (!image1) setImage1(file);
                        else if (!image2) setImage2(file);
                        else if (!image3) setImage3(file);
                        else if (!image4) setImage4(file);
                      }
                    }}
                  />
                  <PiPlus />
                </button>
                {typeof image1 == "string" && image1 ? (
                  <div className="min-w-[100px] relative w-[100px] h-[100px]">
                    <img loading="lazy" src={server + image1} alt="" />
                    <CiTrash
                      className="absolute left-1 top-1 text-red-500 cursor-pointer"
                      onClick={() => setImage1("")}
                    />
                  </div>
                ) : null}
                {typeof image1 == "object" && image1 ? (
                  <div className="min-w-[100px] relative w-[100px] h-[100px]">
                    <img
                      loading="lazy"
                      src={URL.createObjectURL(image1)}
                      alt=""
                    />
                    <CiTrash
                      className="absolute left-1 top-1 text-red-500 cursor-pointer"
                      onClick={() => setImage1("")}
                    />
                  </div>
                ) : null}

                {typeof image2 == "string" && image2 ? (
                  <div className="min-w-[100px] relative w-[100px] h-[100px]">
                    <img loading="lazy" src={server + image2} alt="" />
                    <CiTrash
                      className="absolute left-1 top-1 text-red-500 cursor-pointer"
                      onClick={() => setImage2("")}
                    />
                  </div>
                ) : null}
                {typeof image2 == "object" && image2 ? (
                  <div className="min-w-[100px] relative w-[100px] h-[100px]">
                    <img
                      loading="lazy"
                      src={URL.createObjectURL(image2)}
                      alt=""
                    />
                    <CiTrash
                      className="absolute left-1 top-1 text-red-500 cursor-pointer"
                      onClick={() => setImage2("")}
                    />
                  </div>
                ) : null}

                {typeof image3 == "string" && image3 ? (
                  <div className="min-w-[100px] relative w-[100px] h-[100px]">
                    <img loading="lazy" src={server + image3} alt="" />
                    <CiTrash
                      className="absolute left-1 top-1 text-red-500 cursor-pointer"
                      onClick={() => setImage3("")}
                    />
                  </div>
                ) : null}
                {typeof image3 == "object" && image3 ? (
                  <div className="min-w-[100px] relative w-[100px] h-[100px]">
                    <img
                      loading="lazy"
                      src={URL.createObjectURL(image3)}
                      alt=""
                    />
                    <CiTrash
                      className="absolute left-1 top-1 text-red-500 cursor-pointer"
                      onClick={() => setImage3("")}
                    />
                  </div>
                ) : null}

                {typeof image4 == "string" && image4 ? (
                  <div className="min-w-[100px] relative w-[100px] h-[100px]">
                    <img loading="lazy" src={server + image4} alt="" />
                    <CiTrash
                      className="absolute left-1 top-1 text-red-500 cursor-pointer"
                      onClick={() => setImage4("")}
                    />
                  </div>
                ) : null}
                {typeof image4 == "object" && image4 ? (
                  <div className="min-w-[100px] relative w-[100px] h-[100px]">
                    <img
                      loading="lazy"
                      src={URL.createObjectURL(image4)}
                      alt=""
                    />
                    <CiTrash
                      className="absolute left-1 top-1 text-red-500 cursor-pointer"
                      onClick={() => setImage4("")}
                    />
                  </div>
                ) : null}
              </div>
              <div className="flex gap-5 flex-row">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="الاسم *"
                  className="w-full"
                  sx={{
                    backgroundColor: "white",
                  }}
                />
                <Flex className="w-full" gap={1} direction={"column"}>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      appearance: "none",
                    }}
                    sx={{
                      "&::-ms-expand": {
                        display: "none",
                      },
                      backgroundColor: "white",
                    }}
                    className="dropdown-container"
                    placeholder="أختر النوع *"
                  >
                    {categories?.map((category, index) => (
                      <option key={index} value={category?.id}>
                        {category?.name}
                      </option>
                    ))}
                  </Select>
                  <Flex gap={3}>
                    <IconButton
                      onClick={categoryDisclosure?.onOpen}
                      size={"xs"}
                      colorScheme={category ? "blue" : "green"}
                      icon={category ? <EditIcon /> : <PiPlus />}
                    />
                    <IconButton
                      onClick={() => {
                        categoryContext?.deleteCategory(category);
                      }}
                      isDisabled={!category}
                      size={"xs"}
                      colorScheme="red"
                      icon={<DeleteIcon />}
                    />

                    <UpdateOrCreateCategory
                      category={
                        category
                          ? categories?.find((c) => c?.id == category)
                          : ""
                      }
                      isOpen={categoryDisclosure?.isOpen}
                      onClose={categoryDisclosure?.onClose}
                    />
                  </Flex>
                </Flex>
              </div>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full"
                placeholder="وصف المنتج *"
                sx={{
                  backgroundColor: "white",
                }}
              />
            </div>
          </div> */}

          <div className="grid md:grid-cols-2 grid-cols-1 w-full bg-green-900/20 gap-5 p-5 rounded-xl flex justify-between items-center">
            {/* basic info (name , category , description)*/}
            <div className="flex flex-col gap-3 flex-1">
              <div className="flex gap-10 items-center">
                <input
                  type="text"
                  placeholder="اسم المنتج..."
                  className="border-none bg-[#5f5f5f] w-full placeholder-gray-300 p-3 text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <select className="w-full border-none bg-[#5f5f5f] text-gray-300 p-3">
                  <option>{product?.category_details?.name}</option>
                  {categories?.map((category, index) => (
                    <option key={index} value={category?.id}>
                      {category?.name}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                placeholder="الوصف..."
                className="border-none bg-[#5f5f5f] text-center p-5 placeholder-gray-300 text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* basic info (image) */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center bg-green-400/10 lg:py-7 md:py-5 py-3 px-10 rounded-xl w-11/12">
              {typeof image1 == "string" && image1 ? (
                <div className="min-w-[50px] relative w-[50px]">
                  <img loading="lazy" src={server + image1} alt="" />
                  <CiTrash
                    className="absolute left-1 top-1 text-red-500 cursor-pointer"
                    onClick={() => setImage1("")}
                  />
                </div>
              ) : null}
              {typeof image1 == "object" && image1 ? (
                <div className="min-w-[50px] relative w-[50px]">
                  <img
                    loading="lazy"
                    src={URL.createObjectURL(image1)}
                    alt=""
                  />
                  <CiTrash
                    className="absolute left-1 top-1 text-red-500 cursor-pointer"
                    onClick={() => setImage1("")}
                  />
                </div>
              ) : null}

              {typeof image2 == "string" && image2 ? (
                <div className="min-w-[50px] relative w-[50px]">
                  <img loading="lazy" src={server + image2} alt="" />
                  <CiTrash
                    className="absolute left-1 top-1 text-red-500 cursor-pointer"
                    onClick={() => setImage2("")}
                  />
                </div>
              ) : null}
              {typeof image2 == "object" && image2 ? (
                <div className="min-w-[50px] relative w-[50px]">
                  <img
                    loading="lazy"
                    src={URL.createObjectURL(image2)}
                    alt=""
                  />
                  <CiTrash
                    className="absolute left-1 top-1 text-red-500 cursor-pointer"
                    onClick={() => setImage2("")}
                  />
                </div>
              ) : null}

              {typeof image3 == "string" && image3 ? (
                <div className="min-w-[50px] relative w-[50px]">
                  <img loading="lazy" src={server + image3} alt="" />
                  <CiTrash
                    className="absolute left-1 top-1 text-red-500 cursor-pointer"
                    onClick={() => setImage3("")}
                  />
                </div>
              ) : null}
              {typeof image3 == "object" && image3 ? (
                <div className="min-w-[50px] relative w-[50px]">
                  <img
                    loading="lazy"
                    src={URL.createObjectURL(image3)}
                    alt=""
                  />
                  <CiTrash
                    className="absolute left-1 top-1 text-red-500 cursor-pointer"
                    onClick={() => setImage3("")}
                  />
                </div>
              ) : null}

              {typeof image4 == "string" && image4 ? (
                <div className="min-w-[50px] relative w-[50px]">
                  <img loading="lazy" src={server + image4} alt="" />
                  <CiTrash
                    className="absolute left-1 top-1 text-red-500 cursor-pointer"
                    onClick={() => setImage4("")}
                  />
                </div>
              ) : null}
              {typeof image4 == "object" && image4 ? (
                <div className="min-w-[50px] relative w-[50px]">
                  <img
                    loading="lazy"
                    src={URL.createObjectURL(image4)}
                    alt=""
                  />
                  <CiTrash
                    className="absolute left-1 top-1 text-red-500 cursor-pointer"
                    onClick={() => setImage4("")}
                  />
                </div>
              ) : null}
              <input
                type="file"
                id="fileImage"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    if (!image1) setImage1(file);
                    else if (!image2) setImage2(file);
                    else if (!image3) setImage3(file);
                    else if (!image4) setImage4(file);
                  }
                }}
              />
              <label
                htmlFor="fileImage"
                className="lg:text-5xl md:text-3xl text-2xl bg-[#5f5f5f] lg:py-1 lg:px-5 px-4 text-center text-black rounded-xl w-fit cursor-pointer hover:bg-[#6f6f6f]"
              >
                +
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center text-white text-xl">
              <div className="bg-green-900 w-3 h-2"></div>
              التسعير
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 xl:flex justify-center items-center px-5 bg-green-900/20 text-white p-4 gap-10 rounded-xl">
              <input
                className="text-gray-300 bg-[#5f5f5f] py-2 w-full rounded-xl text-center border border-gray-400"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                className="text-gray-300 bg-[#5f5f5f] py-2 w-full rounded-lg text-center border border-gray-400"
                value={offer_price || "لا يوجد"}
                onChange={(e) => setOfferPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center text-white text-xl">
              <div className="bg-green-900 w-3 h-2"></div>
              المخزون
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 xl:flex justify-center items-center px-5 bg-green-900/20 text-white p-4 gap-10 rounded-xl">
              <input
                className="text-gray-300 bg-[#5f5f5f] py-2 w-full rounded-xl text-center border border-gray-400"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
              <input
                className="text-gray-300 bg-[#5f5f5f] py-2 w-full rounded-lg text-center border border-gray-400"
                value={min_stock}
                onChange={(e) => setMinStock(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center text-white text-xl">
              <div className="bg-green-900 w-3 h-2"></div>
              المنتجات المشابهة
            </div>
            <div className="flex flex-col gap-2">
              {products?.map((product) => (
                <div className="flex gap-2 items-center bg-[#5f5f5f] p-2 rounded-xl">
                  <input
                    onChange={() => {
                      if (related_products?.includes(product?.id)) {
                        setRelatedProducts(
                          related_products?.filter(
                            (item) => item !== product?.id
                          )
                        );
                      } else {
                        setRelatedProducts([...related_products, product?.id]);
                      }
                    }}
                    checked={related_products?.includes(product?.id)}
                    type="checkbox"
                    className="border border-gray-500"
                  />
                  <div className="flex gap-2 items-center">
                    <img src={server + product?.image1} className="w-[50px]" />
                    <p className="text-gray-300">{product?.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="flex flex-col gap-3">
            <strong>التسعير</strong>
            <div className="flex gap-5">
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="text"
                placeholder="السعر *"
                className="w-full"
                sx={{
                  backgroundColor: "white",
                }}
              />
              <Input
                value={offer_price}
                onChange={(e) => setOfferPrice(e.target.value)}
                type="text"
                placeholder="سعر العرض (أختياري)"
                className="w-full"
                sx={{
                  backgroundColor: "white",
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <strong>المخزن</strong>
            <div className="flex gap-5">
              <Input
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                type="number"
                placeholder="المخزن *"
                className="w-full"
                sx={{
                  backgroundColor: "white",
                }}
              />
              <Input
                value={min_stock}
                onChange={(e) => setMinStock(e.target.value)}
                type="number"
                placeholder="الحد الأدنى من المخزن"
                className="w-full"
                sx={{
                  backgroundColor: "white",
                }}
              />
            </div>
          </div>

          <Flex direction={"column"} gap="5">
            <strong>منتجات متعلقة بالمنتج</strong>
            <Flex
              className="h-[150px] p-3 overflow-y-scroll bg-gray-200 rounded-md"
              gap="3"
              direction={"column"}
            >
              {products?.map((product, index) => (
                <Box
                  key={index}
                  shadow={"md"}
                  p={"3"}
                  className="relative p-2 bg-white"
                >
                  <Flex gap={"3"} alignItems={"center"}>
                    <input
                      onChange={() => {
                        if (related_products?.includes(product?.id)) {
                          setRelatedProducts(
                            related_products?.filter(
                              (item) => item !== product?.id
                            )
                          );
                        } else {
                          setRelatedProducts([
                            ...related_products,
                            product?.id,
                          ]);
                        }
                      }}
                      checked={related_products?.includes(product?.id)}
                      type="checkbox"
                    />
                    <img
                      loading="lazy"
                      className="w-[50px]"
                      src={server + product?.image1}
                      alt={product?.name}
                    />
                    <strong>{product?.name}</strong>
                  </Flex>
                </Box>
              ))}
            </Flex>
          </Flex> */}

          <Button
            onClick={() => {
              if (create) {
                handleSaveProduct();
              } else {
                handleUpdateProduct();
              }
            }}
            className="w-full"
            colorScheme="green"
            isLoading={loading}
            disabled={loading}
          >
            حفظ
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdateOrCreateProduct;
