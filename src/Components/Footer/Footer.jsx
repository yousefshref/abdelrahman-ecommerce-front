import React from "react";
import { BsFacebook, BsInstagram, BsTiktok } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div class="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 text-right">
      <div class="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div class="sm:col-span-2">
          <a
            href="/"
            aria-label="Go home"
            title="Company"
            class="inline-flex items-center"
          >
            <img loading="lazy" src="/logo.png" className="w-[60px]" alt="" />
            {/* <span class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              Safe zone
            </span> */}
          </a>
          <div class="mt-6 lg:max-w-sm">
            <p class="text-sm text-gray-800">
              ولاني عايزك دايما في السيف زوون ف خليت كل حاجه عندك في متجر واحد
              مضمون خاص بيك وجوا الزوون بتاعتك{" "}
            </p>
          </div>
        </div>
        <div class="space-y-2 text-sm">
          <p class="text-base font-bold tracking-wide text-gray-900">
            طرق التواصل
          </p>
          <div class="flex">
            <p class="mr-1 text-gray-800">الهاتف:</p>
            <a
              dir="ltr"
              href="tel:+20 109 395 2937"
              aria-label="Our phone"
              title="Our phone"
              class="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              +20 109 395 2937
            </a>
          </div>
          <div class="flex">
            <p class="mr-1 text-gray-800">البريد الالكتروني:</p>
            <a
              href="mailto:info@lorem.mail"
              aria-label="Our email"
              title="Our email"
              class="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              abdelrahmanmashaly779@gmail.com
            </a>
          </div>
        </div>
        <div>
          <span class="text-base font-bold tracking-wide text-gray-900">
            السوشيال ميديا
          </span>
          <div class="flex items-center mt-1 gap-3">
            <a
              href="https://www.tiktok.com/@abdelrahamnfit?_t=8rAgtC0QkaX&_r=1"
              class="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <BsTiktok />
            </a>
            <a
              href="https://www.instagram.com/abdelrahmanzone/profilecard/?igsh=MXNwdTFsN25ud3M4MA=="
              class="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <BsInstagram />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61564427757812&mibextid=LQQJ4d"
              class="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <BsFacebook />
            </a>
          </div>
          <p class="mt-4 text-sm text-gray-500">
            تابع كل الجديد والمحتوى المقدم من خلال متابعتنا على المنصات
          </p>
        </div>
      </div>
      <div className="flex justify-between pt-5 pb-10 border-t lg:flex-row">
        <Link to="/aboutUs" className="text-blue-500 underline">
          معلومات عنا
        </Link>
        <Link to="/privacy_policy" className="text-blue-500 underline">
          سياسة الخصوصية
        </Link>
        <Link to="/refund_policy" className="text-blue-500 underline">
          سياسة الاسترجاع والاستبدال
        </Link>
      </div>
      {/* <div class="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
        <p class="text-sm text-gray-600">
          © Copyright 2020 Lorem Inc. All rights reserved.
        </p>
        <ul class="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
          <li>
            <a
              href="/"
              class="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              F.A.Q
            </a>
          </li>
          <li>
            <a
              href="/"
              class="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="/"
              class="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              Terms &amp; Conditions
            </a>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default Footer;
