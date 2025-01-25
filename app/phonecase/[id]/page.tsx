"use client";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { BsInfoCircle, BsStarFill } from "react-icons/bs";
import Toman from "@/assets/toman.svg";
import Image from "next/image";
import { FaAngleLeft } from "react-icons/fa";
import { useState, useEffect } from "react";

// Define the type for the product data
interface Product {
  id: string;
  title: string;
  desc: string;
  image: string;
}

function Page({ params }: { params: { id: string } }) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedSecondOption, setSelectedSecondOption] = useState<string>("");
  const [showSecondSelect, setShowSecondSelect] = useState<boolean>(false);
  const [showThirdSelect, setShowThirdSelect] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const mojod = true;

  // Fetch product data based on the ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
      }
    };

    fetchProduct();
  }, [params.id]);

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
      {!product ? <span></span> : <span></span>}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
        <div className="w-full lg:w-1/4 flex justify-center items-center flex-col gap-4">
          <div className="w-1/2 lg:w-full pointer-events-none px-4">
            {loading ? (
              <ProductCard title={""} image={""} />
            ) : (
              <ProductCard
                title={product?.title || ""}
                image={product?.image || ""}
              />
            )}
          </div>
          <p className="minibutton">
            <BsInfoCircle />
            این تصویر صرفا جهت نمایش طرح قاب موبایل است.
          </p>
          <p className="minibutton -mt-2">
            قابی که به شما تحویل داده میشه، دقیقا مناسب همون مدل گوشی ای هست که
            موقع خرید انتخاب میکنید.
          </p>
        </div>
        {/*  */}
        <div className="w-full pt-12 lg:w-2/5 flex flex-col justify-start md:justify-center items-start gap-3">
          <div className="flex flex-col justify-start gap-2 w-full">
            <div
              id="productRouteContainer"
              className="font-extralight inline-flex gap-1.5"
            >
              <Link href={"/"}>خانه</Link>/
              <Link href={"/phonecase"}>قاب موبایل</Link>/
              {loading ? (
                <Link href={""} className="loadingpartanim cursor-default">
                  sjdflsjdflsjdflj
                </Link>
              ) : (
                <Link href={`/phonecase/${product?.id}`}>{product?.title}</Link>
              )}
            </div>
            {loading ? (
              <p className="loadingpartanim text-2xl font-black">
                jsfjlksjf fjsldjf sldj
              </p>
            ) : (
              <h1 className="text-2xl font-black">{product?.title}</h1>
            )}
            {loading ? (
              <p className="loadingpartanim text-sm mb-2">
                sdf sdj hkjhksjfh kjfh
              </p>
            ) : (
              <p className="font-extralight text-sm mb-2">{product?.desc}</p>
            )}
            <hr />
            <div className="inline-flex items-center gap-2">
              <p className="inline-flex gap-1 items-center">
                <span className="text-xl font-semibold">{"5"}</span>
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
          </div>
        </div>
        {/*  */}
        <div className="w-full lg:w-2/5">
          <div className="bg-zinc-200 flex justify-between flex-col rounded-lg w-full p-4">
            <div>
              <div className="flex flex-col">
                <select
                  id="first-select"
                  value={selectedOption}
                  onChange={handleFirstSelectChange}
                  className="p-2 rounded-lg"
                >
                  <option value="">برند موبایل را انتخاب کنید</option>
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
                    <option value="">مدل موبایل را انتخاب کنید</option>
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
            </div>
            <div className="w-full flex justify-between mt-4">
              {mojod ? (
                <>
                  <button className="bg-black w-3/5 lg:w-fit text-white py-3 px-6 lg:py-2 rounded-lg text-xl">
                    افزودن به سبد
                  </button>
                  <span className="w-2/5 font-medium text-2xl inline-flex justify-end items-center gap-0.5 tracking-wide">
                    250000
                    <Image src={Toman} alt="Toman Symbol" />
                  </span>
                </>
              ) : (
                <span className="w-full font-medium text-2xl inline-flex justify-center items-center">
                  ناموجود!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
