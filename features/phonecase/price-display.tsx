"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface PriceDisplayProps {
  modelId: string;
  onResult?: (price: number | null, available: boolean) => void;
}

function PriceDisplay({ modelId, onResult }: PriceDisplayProps) {
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState<number | null>(null);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const fetchPrice = async () => {
      if (!modelId) {
        setPrice(null);
        setAvailable(false);
        onResult?.(null, false);
        return;
      }
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("phone_models")
          .select("price, available")
          .eq("id", modelId)
          .single();

        if (error || !data || !data.available || !data.price) {
          setPrice(null);
          setAvailable(false);
          onResult?.(null, false);
        } else {
          const numericPrice = parseInt(data.price);
          setPrice(numericPrice);
          setAvailable(true);
          onResult?.(numericPrice, true);
        }
      } catch (err) {
        setPrice(null);
        setAvailable(false);
        onResult?.(null, false);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [modelId]);

  if (modelId === "") {
    return;
  }
  if (loading) return <Skeleton className="h-8 w-28"></Skeleton>;
  if (!available || price === null)
    return <span className="text-red-500">ناموجود :(</span>;

  return <span>{price.toLocaleString()} تومان</span>;
}

export default PriceDisplay;
