"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Card from "@/features/phonecase/card";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supbabase/client";

interface Design {
  id: string;
  name: string;
  design: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}

function Page() {
  const params = useParams();
  const [design, setDesign] = useState<Design | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("designs")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) {
          setError("محصول پیدا نشد");
          return;
        }

        setDesign(data);
      } catch (err) {
        setError("خطا در بارگذاری اطلاعات");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchDesign();
    }
  }, [params.id]);

  const formatPrice = (price: number) => {
    return Math.round(price / 1000);
  };

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto pb-8">
        <div className="flex justify-center items-center h-96">
          <div className="text-white text-xl">در حال بارگذاری...</div>
        </div>
      </main>
    );
  }

  if (error || !design) {
    return (
      <main className="max-w-7xl mx-auto pb-8">
        <div className="flex justify-center items-center h-96">
          <div className="text-red-400 text-xl">{error}</div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="max-w-7xl mx-auto pb-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start pb-4 border-b border-stone-800">
          {/* Product Image Section */}
          <div className="w-full md:w-1/2">
            <div className="pointer-events-none flex items-center justify-center p-8">
              <div className="w-1/2 md:w-2/3">
                <Card image_url={design.image_url} />
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex justify-start flex-col w-full gap-4">
            <div className="flex flex-col gap-4">
              <div className="opacity-70 font-light text-sm">
                ویلون فارسی / قاب موبایل / {design.name}
              </div>
              {/* Title */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                  {design.name}
                </h1>
              </div>
            </div>

            {/* Price */}
            <div className="flex justify-start items-end gap-2">
              <span className="text-2xl font-medium text-white">222تومان</span>
            </div>

            <div className="flex flex-col gap-4">
              {/* Action Buttons */}
              <div className="space-y-4 ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <button className="w-full bg-white text-black font-medium py-4 px-6 rounded-lg hover:bg-gray-100 transition-colors">
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
