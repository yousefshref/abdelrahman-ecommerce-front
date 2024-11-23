import React from "react";

const CustomReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "أمجد",
      image: "https://i.pinimg.com/736x/87/22/ec/8722ec261ddc86a44e7feb3b46836c10.jpg",
      comment:
        "أنت عارف في الشهرين اللي فاتو زادني 1.8 سنت n\ عشان كدة حواصل عليه",
      color: "gray-300",
    },
    {
      id: 2,
      name: "عائشة محمد",
      image: "https://i.pinimg.com/564x/9d/a2/c7/9da2c77128b14079fbf194a6d6010347.jpg",
      comment:
        "حبيبي انا استخدمتو 3 اشهر طولت عليه ما يقارب ال6 سنتي وعمري 16, وتحياتي الك",
      margin: "50px",
      color: "indigo-500",
    },
    {
      id: 3,
      name: "عبدالله",
      image: "https://i.pinimg.com/736x/ee/d9/af/eed9afe384933d19b615a1610b738b85.jpg",
      comment:
        "انا استخدمته عمري 14 كان طولي 145 الحين 152 في 3 شهور ويس",
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
          القي نظرة على ما يقول عملاءنا في منتجاتنا وثقتهم بنا
        </p>
        {/* <button className="md:block hidden group mt-5 group-hover:before:duration-500 group-hover:after:duration-1000 after:duration-500 hover:border-lime-300  duration-500 before:duration-500 hover:duration-500 hover:after:-right-2 hover:before:top-8 hover:before:right-16 hover:after:scale-150 hover:after:blur-none hover:before:-bottom-8 hover:before:blur-none hover:bg-lime-300 hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-lime-900 relative bg-lime-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-lime-400 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-lime-600 after:right-8 after:top-3 after:rounded-full after:blur">
          شاهد المزيد
        </button> */}
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
            <img loading="lazy"
              src={review.image}
              alt={review.name}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full mt-3 md:mt-0"
            />
          </div>
        ))}
      </div>
      {/* <button className="md:hidden block group mt-5 group-hover:before:duration-500 group-hover:after:duration-1000 after:duration-500 hover:border-lime-300  duration-500 before:duration-500 hover:duration-500 hover:after:-right-2 hover:before:top-8 hover:before:right-16 hover:after:scale-150 hover:after:blur-none hover:before:-bottom-8 hover:before:blur-none hover:bg-lime-300 hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-lime-900 relative bg-lime-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-lime-400 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-lime-600 after:right-8 after:top-3 after:rounded-full after:blur">
        شاهد المزيد
      </button> */}
    </div>
  );
};

export default CustomReviews;
