import React from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

const Refund = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 flex items-center md:px-10">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-green-600 text-center mb-8">
            سياسة الاسترجاع
          </h1>
          <p className="text-gray-700 text-lg leading-7 mb-6 text-right">
            نهدف إلى ضمان رضا عملائنا بشكل كامل عن المنتجات التي يطلبونها. توضح
            هذه السياسة الشروط والأحكام المتعلقة بإرجاع واستبدال المنتجات.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-right">
              الشروط العامة للاسترجاع
            </h2>
            <ul className="list-disc list-inside text-gray-700 text-lg leading-7 text-right">
              <li>يجب أن يكون المنتج في حالته الأصلية وغير مستخدم أو مفتوح.</li>
              <li>
                يجب تقديم طلب الاسترجاع خلال فترة 14 يومًا من استلام الطلب.
              </li>
              <li>
                يجب أن تكون جميع المرفقات والعبوات الأصلية موجودة مع المنتج.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-right">
              المنتجات غير القابلة للاسترجاع
            </h2>
            <p className="text-gray-700 text-lg leading-7 text-right">
              لا يمكن استرجاع المنتجات التالية:
            </p>
            <ul className="list-disc list-inside text-gray-700 text-lg leading-7 text-right">
              <li>المنتجات التي تم فتحها أو استخدامها.</li>
              <li>المنتجات القابلة للتلف مثل المكملات الغذائية بعد فتحها.</li>
              <li>
                العناصر التي تم شراؤها ضمن العروض الخاصة أو التخفيضات النهائية.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-right">
              خطوات طلب الاسترجاع
            </h2>
            <p className="text-gray-700 text-lg leading-7 text-right">
              لطلب استرجاع منتج، يرجى اتباع الخطوات التالية:
            </p>
            <li className="text-gray-700 text-lg leading-7 text-right mt-2">
              التواصل مع خدمة العملاء و طلب الاسترجاع.
            </li>
          </section>
        </div>
        <img
          src="http://pluspng.com/img-png/refund-2-icon-1600.png"
          className="w-1/3 md:block hidden"
        />
      </div>
      <Footer />
    </>
  );
};

export default Refund;
