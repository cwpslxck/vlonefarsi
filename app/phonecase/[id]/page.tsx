"use client";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { BsInfoCircle, BsStarFill } from "react-icons/bs";
import Toman from "@/assets/toman.svg";
import Image from "next/image";
import { FaAngleLeft } from "react-icons/fa";
import { useState } from "react";

function Page() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedSecondOption, setSelectedSecondOption] = useState<string>("");
  const [showSecondSelect, setShowSecondSelect] = useState<boolean>(false);
  const [showThirdSelect, setShowThirdSelect] = useState<boolean>(false);

  const firstOptions = [
    { value: "iphone", label: "آیفون" },
    { value: "samsung", label: "سامسونگ" },
    { value: "xiaomi", label: "شیاومی" },
    { value: "huawei", label: "هواوی" },
  ];

  const secondOptions = {
    "": [],
    iphone: [
      { value: "iphone13", label: "آیفون ۱۳" },
      { value: "iphone14", label: "آیفون ۱۴" },
    ],
    samsung: [
      { value: "s22", label: "گلکسی S22" },
      { value: "s23", label: "گلکسی S23" },
    ],
    xiaomi: [
      { value: "mi11", label: "می ۱۱" },
      { value: "mi12", label: "می ۱۲" },
    ],
    huawei: [
      { value: "p50", label: "P50" },
      { value: "p60", label: "P60" },
    ],
  };

  const thirdOptions = [
    { value: "3d", label: "سه بعدی معمولی" },
    { value: "3dfull", label: "سه بعدی فول" },
    { value: "2dmat", label: "دوبعدی مات" },
    { value: "2dbrgh", label: "دوبعدی براق" },
  ];

  const handleFirstSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    if (value == "") {
      setShowSecondSelect(false);
    } else setShowSecondSelect(true);
    setSelectedOption(value);
    setShowThirdSelect(false);
  };

  const handleSecondSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedSecondOption(value);
    setShowThirdSelect(true);
  };

  const handleSearchQuanity = () => {};
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
        <div className="w-full lg:w-2/5 flex justify-center items-center flex-col gap-4">
          <div className="w-1/2">
            <ProductCard title="Hello" image={""} />
          </div>
          <p className="minibutton">
            <BsInfoCircle />
            این تصویر صرفا جهت نمایش طرح قاب موبایل است.
          </p>
        </div>
        {/*  */}
        <div className="w-full lg:w-2/5 flex flex-col justify-start md:justify-center items-start gap-3">
          <div className="flex flex-col justify-start gap-2 w-full">
            <div
              id="productRouteContainer"
              className="font-extralight inline-flex gap-1.5"
            >
              <Link href={"/"}>خانه</Link>/
              <Link href={"/phonecase"}>قاب موبایل</Link>/
              <Link href={"/phonecase/1"}>نام محصول</Link>
            </div>
            <h1 className="text-2xl font-black">نام محصول قاب موبایل</h1>
            <p className="font-extralight text-sm mb-2">
              Custom Phonecase Design
            </p>
            <hr />
            <div className="inline-flex items-center gap-2">
              <p className="inline-flex gap-1 items-center">
                <span className="text-xl font-semibold">5</span>
                <BsStarFill className="text-2xl text-yellow-500" />
                <span className="font-extralight text-sm">
                  بر اساس نظر {"12"} خریدار
                </span>
              </p>
              <a className="minibutton" href="#comments">
                مشاهده نظرات
                <FaAngleLeft />
              </a>
            </div>
            <hr />
            <p>توضیحات</p>
          </div>
        </div>
        {/*  */}
        <div className="w-full lg:w-2/5">
          <div className="bg-zinc-200 rounded-lg w-full p-4">
            <div className="flex flex-col">
              <select
                id="first-select"
                value={selectedOption}
                onChange={handleFirstSelectChange}
                className="p-2 rounded-lg"
              >
                <option value="">برند موبایل خود را انتخاب کنید</option>
                {firstOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {showSecondSelect && (
                <select
                  id="second-select"
                  value={selectedSecondOption}
                  onChange={handleSecondSelectChange}
                  className="p-2 rounded-lg"
                >
                  <option value="">مدل موبایل خود را انتخاب کنید</option>
                  {secondOptions[
                    selectedOption as keyof typeof secondOptions
                  ].map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}

              {showThirdSelect && (
                <select
                  onChange={handleSearchQuanity}
                  id="third-select"
                  className="p-2 rounded-lg"
                >
                  <option value="">جنس قاب موبایل را انتخاب کنید</option>
                  {thirdOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="w-full flex justify-between mt-4">
              <button className="bg-black w-3/5 lg:w-fit text-white py-3 px-6 lg:py-2 rounded-lg text-xl">
                افزودن به سبد
              </button>
              <span className="w-2/5 font-medium text-2xl inline-flex justify-end items-center gap-0.5 tracking-wide">
                250000
                <Image src={Toman} alt="Toman Symbol" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
