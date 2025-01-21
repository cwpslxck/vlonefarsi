import loadingImage from "@/assets/loading.jpg";
import ProductCard from "@/components/ProductCard";
import React from "react";

function page() {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="w-full lg:w-1/3 flex justify-center items-center flex-col">
          <div className="w-1/2">
            <ProductCard title="Hello" image={""} />
          </div>
          <p className="text-center">
            این تصور صرفا جهت نمایش طرح قاب موبایل است و قاب موبایل اصلی، مخصوص
            مدل موبایل شما آماده سازی میشه
          </p>
        </div>
        <div className="w-full lg:w-2/3 flex flex-col justify-start">
          <div className="flex flex-col justify-start">
            <div>آدرس محصول</div>
            <p>امتیاز و تعداد خرید</p>
            <h1>نام محصول</h1>
            <p>توضیحات</p>
          </div>
          <div className="bg-zinc-200 rounded-lg min-h-28 w-1/2">
            انتخاب مدل و فلان
          </div>
          <span>250000</span>
          <button className="bg-black w-fit text-white px-5 py-2 rounded-lg">
            افزودن به سبد
          </button>
        </div>
      </div>
      {/* tozihat folan */}
      <div className="min-h-[50vh] bg-blue-100 rounded-xl mt-4"></div>
    </>
  );
}

export default page;
