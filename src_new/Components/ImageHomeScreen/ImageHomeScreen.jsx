import React, { useEffect, useState } from "react";
import { BiPlus, BiTrash } from "react-icons/bi";

const ImageHomeScreen = ({ image, categoryContext, api }) => {
  const [product, setProduct] = useState("");

  useEffect(() => {
    setProduct(image?.product);
  }, [image]);

  const [loading, setLoading] = React.useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    await categoryContext
      ?.updateHomePageImage(image?.id, { product: product })
      .then((e) => console.log(e));
    setLoading(false);
  };
  return (
    <div key={image?.id} className="flex flex-col gap-1">
      <div className="relative">
        <img
          loading="lazy"
          className="w-full h-[140px] rounded-xl"
          src={api + image?.image}
          alt=""
        />
        <BiTrash
          onClick={() => categoryContext?.deleteHomePageImage(image?.id)}
          className="absolute top-2 right-2 w-[30px] h-[30px] p-1 rounded-md text-white bg-red-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ImageHomeScreen;
