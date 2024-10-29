import React from "react";

const CustomReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "اسم المستخدم",
      image: "https://picsum.photos/200/300",
      comment:
        "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      color: "gray-300",
    },
    {
      id: 2,
      name: "اسم المستخدم",
      image: "https://picsum.photos/200/300",
      comment:
        "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      margin: "50px",
      color: "indigo-500",
    },
    {
      id: 3,
      name: "اسم المستخدم",
      image: "https://picsum.photos/200/300",
      comment:
        "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      color: "gray-300",
    },
  ];

  return (
    <div className="mt-20 flex flex-col md:flex-row items-center justify-between bg-gray-50 p-5">
      {/* Left Section */}
      <div className="flex flex-col items-start md:items-start text-right">
        <h1 className="text-3xl md:text-5xl font-bold">
          ماذا يقول عملائنا عنا؟
        </h1>
        <p className="w-full md:w-[500px] mt-5">
          لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور
          طريقه وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعه
          <br /> او تحويل النصوص الى صوره
        </p>
        <button className="group mt-5 group-hover:before:duration-500 group-hover:after:duration-1000 after:duration-500 hover:border-lime-300  duration-500 before:duration-500 hover:duration-500 hover:after:-right-2 hover:before:top-8 hover:before:right-16 hover:after:scale-150 hover:after:blur-none hover:before:-bottom-8 hover:before:blur-none hover:bg-lime-300 hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-lime-900 relative bg-lime-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-lime-400 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-lime-600 after:right-8 after:top-3 after:rounded-full after:blur">
          شاهد المزيد
        </button>
      </div>
      {/* Right Section */}
      <div className="flex flex-col items-center mt-10 md:mt-0">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col md:flex-row items-center mt-3 bg-white shadow-sm p-2 rounded relative"
            style={{ marginRight: review.margin }}
          >
            <div
              className={`absolute h-full w-1 left-[-10px] md:left-[-20px] top-0 bg-${review.color}`}
            ></div>
            <div className="flex flex-col items-start gap-2 ml-5">
              <h2 className="text-xl md:text-2xl font-bold">{review.name}</h2>
              <p className="text-sm max-w-full md:max-w-[300px] text-right">
                {review.comment}
              </p>
            </div>
            <img
              src={review.image}
              alt={review.name}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full mt-3 md:mt-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomReviews;
