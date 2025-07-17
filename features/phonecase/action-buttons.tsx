"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface PhoneModel {
  id: string;
  brand: string;
  model: string;
}

function ActionButtons() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [models, setModels] = useState<PhoneModel[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [brands] = useState([
    { id: "iphone", name: "iPhone - آیفون" },
    { id: "samsung", name: "Samsung - سامسونگ" },
    { id: "xiaomi", name: "Xiaomi - شیاومی" },
    { id: "huawei", name: "Huawei - هواوی" },
  ]);

  useEffect(() => {
    const storedBrand = localStorage.getItem("user_phone_brand");
    const storedModel = localStorage.getItem("user_phone_model");

    if (storedBrand) setSelectedBrand(storedBrand);
    if (storedModel) setSelectedModel(storedModel);
  }, []);

  useEffect(() => {
    const fetchModels = async () => {
      if (!selectedBrand) {
        setModels([]);
        setError(null);
        return;
      }

      setLoadingModels(true);
      setSelectedModel(null);
      setError(null);

      try {
        const { data, error: supabaseError } = await supabase
          .from("phone_models")
          .select("*")
          .eq("brand", selectedBrand);

        if (supabaseError) throw supabaseError;

        if (!data || data.length === 0) {
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
      } catch (error) {
        console.error("Error fetching models:", error);
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
  return (
    <div className="space-y-4">
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

      <button
        className={`w-full bg-white text-black font-medium py-4 px-6 rounded-lg transition-colors ${
          selectedModel ? "hover:bg-gray-100" : "opacity-50 cursor-not-allowed"
        }`}
        disabled={!selectedModel}
      >
        افزودن به سبد خرید
      </button>
    </div>
  );
}

export default ActionButtons;
