"use client";
import Card from "@/features/phonecase/card";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import ActionButtons from "@/features/phonecase/action-buttons";

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
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 pb-4 border-b border-stone-800">
          {/* Product Image Section */}
          <div className="w-full md:w-1/2">
            <div className="pointer-events-none flex items-center justify-center p-4 md:p-0">
              <div className="w-1/2 md:w-full">
                <Card image_url={design.image_url} />
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex justify-between flex-col w-full gap-4">
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

            <div className="flex w-full gap-4 flex-col justify-between">
              {/* Price */}
              <div className="flex justify-start items-end gap-2">
                <span className="text-2xl font-medium text-white">
                  222تومان
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {/* Action Buttons */}
                <ActionButtons />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
