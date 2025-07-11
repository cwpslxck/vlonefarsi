import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Card from "@/features/phonecase/card";

function Page() {
  return (
    <>
      <main className="max-w-7xl mx-auto pb-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start pb-4 border-b border-stone-800">
          {/* Product Image Section */}
          <div className="w-full md:w-1/2">
            <div className="pointer-events-none flex items-center justify-center p-8">
              <div className="w-1/2 md:w-2/3">
                <Card />
              </div>
              {/* <div className="bg-white/10 px-3 py-1 rounded-full flex items-center text-sm gap-1">
                <BiInfoCircle />
                این تصویر فقط پیشنمایشی از محصولیه که به دستتون میرسه
              </div> */}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex justify-start flex-col w-full gap-4">
            <div className="flex flex-col gap-4">
              <div className="opacity-70 font-light text-sm">
                ویلون فارسی / قاب موبایل / پلی بوی
              </div>
              {/* Title */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                  پلی بوی
                </h1>
              </div>
            </div>
            {/* Price */}
            <div className="flex justify-start items-end gap-2">
              <span className="text-2xl font-semibold text-white">
                {"260"}تومان
              </span>
              <div className="flex-col hidden">
                <span className="text-lg text-gray-500 line-through">
                  290تومان
                </span>
                <span className="bg-red-600 text-white px-2 py-1 rounded-md text-sm font-medium">
                  شگفتانه!
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Action Buttons */}
              <div className="space-y-4 ">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                  <Select>
                    <SelectTrigger size="shoping-page" className="w-full h-14">
                      <SelectValue placeholder="برند موبایل" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iphone">iPhone - آیفون</SelectItem>
                      <SelectItem value="samsung">Samsung - سامسونگ</SelectItem>
                      <SelectItem value="xiaomi">Xiaomi - شیاومی</SelectItem>
                      <SelectItem value="huawei">Huawei - هواوی</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger size="shoping-page" className="w-full h-14">
                      <SelectValue placeholder="مدل موبایل" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="test">Test</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <button className="w-full bg-white text-black font-medium py-4 px-6 rounded-lg">
                  افزودن به سبد خرید
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-stone-900 rounded-lg">
                    <div className="bg-lime-600 p-2 rounded-lg">
                      <div className="h-5 w-5 bg-white/20 rounded"></div>
                    </div>
                    <div>
                      <p className="font-medium text-white">بالاترین کیفیت</p>
                      <p className="text-sm text-gray-400">
                        قابها ابعاد استاندارد گوشی رو دارن و از گوشیتون محافظت
                        میکنن
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-stone-900 rounded-lg">
                    <div className="bg-lime-600 p-2 rounded-lg">
                      <div className="h-5 w-5 bg-white/20 rounded"></div>
                    </div>
                    <div>
                      <p className="font-medium text-white">همیشه موجود</p>
                      <p className="text-sm text-gray-400">
                        آماده سازی بعد از سفارش شما انجام میشه پس همیشه موجوده!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Page;
