"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useProtectedAction } from "@/hooks/use-protected-action";
import { Skeleton } from "@/components/ui/skeleton";

interface PhoneModel {
  id: string;
  brand: string;
  model: string;
  price: number | null;
  available: boolean;
}

interface ActionButtonsProps {
  designId: string;
}

export default function ActionButtons({ designId }: ActionButtonsProps) {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [models, setModels] = useState<PhoneModel[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { protect } = useProtectedAction();

  const brands = [
    { id: "iphone", name: "iPhone - آیفون" },
    { id: "samsung", name: "Samsung - سامسونگ" },
    { id: "xiaomi", name: "Xiaomi - شیاومی" },
    { id: "huawei", name: "Huawei - هواوی" },
  ];

  // restore from localStorage
  useEffect(() => {
    const storedBrand = localStorage.getItem("user_phone_brand");
    const storedModel = localStorage.getItem("user_phone_model");

    if (storedBrand) setSelectedBrand(storedBrand);
    if (storedModel) setSelectedModel(storedModel);
  }, []);

  // fetch models from API route
  useEffect(() => {
    if (!selectedBrand) {
      setModels([]);
      setError(null);
      return;
    }

    const fetchModels = async () => {
      setLoadingModels(true);
      setSelectedModel(null);
      setError(null);

      try {
        const res = await fetch(`/api/models/${selectedBrand}`);
        const data: PhoneModel[] = await res.json();

        if (!res.ok || !data || data.length === 0) {
          setError("مدلی برای این برند یافت نشد");
          setModels([]);
        } else {
          setModels(data);
          setError(null);

          const storedModel = localStorage.getItem("user_phone_model");
          if (storedModel && data.some((m) => m.id === storedModel)) {
            setSelectedModel(storedModel);
          }
        }
      } catch (err) {
        console.error(err);
        setError("خطا در دریافت مدل‌ها. لطفا دوباره تلاش کنید");
        setModels([]);
      } finally {
        setLoadingModels(false);
      }
    };

    fetchModels();
  }, [selectedBrand]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    localStorage.setItem("user_phone_brand", brand);
    localStorage.removeItem("user_phone_model");
    setSelectedModel(null);
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    localStorage.setItem("user_phone_model", model);
  };

  const handleAddToCart = protect(async () => {
    if (!selectedModel) return;

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          design_id: designId,
          phone_model_id: selectedModel,
          quantity: 1,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "خطا در افزودن به سبد خرید");
      } else {
        router.push("/buy");
      }
    } catch {
      setError("خطای شبکه");
    }
  });

  const selectedModelData = models.find((m) => m.id === selectedModel);

  return (
    <div className="space-y-4">
      <div className="text-2xl font-medium min-h-12 flex items-end">
        {!selectedModel ? null : loadingModels ? (
          <Skeleton className="h-8 w-28" />
        ) : selectedModelData &&
          selectedModelData.available &&
          selectedModelData.price ? (
          <span>{selectedModelData.price.toLocaleString()} تومان</span>
        ) : (
          <span className="text-red-500">ناموجود :(</span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          value={selectedBrand || undefined}
          onValueChange={handleBrandChange}
        >
          <SelectTrigger size="shoping-page" className="w-full h-14">
            <SelectValue placeholder="برند موبایل" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((brand) => (
              <SelectItem key={brand.id} value={brand.id}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedModel || undefined}
          onValueChange={handleModelChange}
          disabled={!selectedBrand || loadingModels || !!error}
        >
          <SelectTrigger size="shoping-page" className="w-full h-14">
            {selectedModel ? (
              <SelectValue />
            ) : (
              <span className="text-muted-foreground text-sm">
                {loadingModels
                  ? "در حال بارگیری..."
                  : !selectedBrand
                  ? "ابتدا برند را انتخاب کنید"
                  : "مدل موبایل را انتخاب کنید"}
              </span>
            )}
          </SelectTrigger>

          <SelectContent>
            {models.length > 0 ? (
              models.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.model}
                </SelectItem>
              ))
            ) : (
              <div className="text-sm text-gray-500 px-2 py-1.5">
                {error || "مدلی یافت نشد"}
              </div>
            )}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="button"
        size={"lg"}
        className="w-full disabled:cursor-not-allowed"
        disabled={!selectedModelData?.available || !selectedModelData?.price}
        onClick={handleAddToCart}
      >
        افزودن به سبد خرید
      </Button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
