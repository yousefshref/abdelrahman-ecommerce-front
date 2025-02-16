import React from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

const Privacy = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen flex items-center md:px-10">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-green-600 text-center mb-8">
            سياسة الخصوصية
          </h1>
          <p className="text-gray-700 text-lg leading-7 mb-6">
            نحن ملتزمون بحماية خصوصية مستخدمينا وضمان أن بياناتكم الشخصية يتم
            التعامل معها بأمان. توضح سياسة الخصوصية هذه كيفية جمع واستخدام
            البيانات الخاصة بكم عند استخدام موقعنا.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              البيانات التي نقوم بجمعها
            </h2>
            <ul className="list-disc list-inside text-gray-700 text-lg leading-7">
              <li>
                المعلومات الشخصية مثل الاسم، البريد الإلكتروني، ورقم الهاتف.
              </li>
              <li>معلومات الطلب مثل العنوان وتفاصيل المنتجات المطلوبة.</li>
              <li>
                بيانات التصفح مثل عنوان الـ IP وسجل التصفح لتحسين تجربة
                المستخدم.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              كيفية استخدام البيانات
            </h2>
            <p className="text-gray-700 text-lg leading-7">
              نستخدم بياناتكم للأغراض التالية:
            </p>
            <ul className="list-disc list-inside text-gray-700 text-lg leading-7">
              <li>معالجة الطلبات وإتمام عمليات الشراء.</li>
              <li>تحسين تجربة التسوق من خلال تخصيص العروض والخدمات.</li>
              <li>التواصل معكم بشأن الطلبات أو العروض أو تحديثات الموقع.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              حماية البيانات
            </h2>
            <p className="text-gray-700 text-lg leading-7">
              نحن نلتزم باتخاذ جميع الإجراءات اللازمة لحماية بياناتكم من الوصول
              غير المصرح به أو الاستخدام غير القانوني.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              حقوق المستخدم
            </h2>
            <p className="text-gray-700 text-lg leading-7">يحق لكم:</p>
            <ul className="list-disc list-inside text-gray-700 text-lg leading-7">
              <li>الوصول إلى البيانات الخاصة بكم.</li>
              <li>طلب تعديل أو حذف بياناتكم الشخصية.</li>
              <li>الاعتراض على معالجة بياناتكم في أي وقت.</li>
            </ul>
          </section>
        </div>
        <img
          src="https://www.onestepcare.com.au/wp-content/uploads/2022/11/privacy-policy-vector.png"
          className="lg:block hidden w-1/3"
        />
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
