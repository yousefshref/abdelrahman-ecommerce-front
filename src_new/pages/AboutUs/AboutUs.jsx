import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import {
  FaDumbbell,
  FaShippingFast,
  FaStar,
  FaShoppingCart,
} from "react-icons/fa";
import Footer from "../../Components/Footer/Footer";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 min-h-screen">
      <Navbar />
      <section className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-5xl font-extrabold text-green-600 mb-6">من نحن</h1>
        <p className="text-lg text-gray-700 leading-8 mb-8">
          مرحبًا بكم في متجرنا الإلكتروني الرائد في توفير منتجات الصحة واللياقة
          البدنية. نقدم أفضل المنتجات التي تساعدكم في تحقيق أهدافكم الصحية
          والرياضية بسهولة وجودة.
        </p>
        <h2 className="text-4xl font-bold text-green-600 mb-6">رؤيتنا</h2>
        <p className="text-lg text-gray-700 leading-8 mb-8">
          نطمح لأن نكون المصدر الأول لمنتجات الصحة واللياقة البدنية في العالم
          العربي، مع التركيز على الجودة، التنوع، والراحة لعملائنا.
        </p>

        <h2 className="text-4xl font-bold text-green-600 mb-6">لماذا نحن؟</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <FaDumbbell className="text-green-600 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              جودة عالية
            </h3>
            <p className="text-gray-600">
              منتجاتنا مختارة بعناية لضمان أعلى مستويات الجودة.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <FaShippingFast className="text-green-600 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              شحن سريع
            </h3>
            <p className="text-gray-600">
              نوفر خيارات شحن سريعة وآمنة لتلبية احتياجاتكم.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <FaStar className="text-green-600 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              ثقة العملاء
            </h3>
            <p className="text-gray-600">
              نتمتع بثقة الآلاف من العملاء الراضين.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <FaShoppingCart className="text-green-600 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              أسعار تنافسية
            </h3>
            <p className="text-gray-600">
              نقدم أفضل الأسعار مع الحفاظ على أعلى جودة.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUs;
