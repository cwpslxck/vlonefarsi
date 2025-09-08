"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card as CardComp, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2 } from "lucide-react";
import Card from "@/features/phonecase/card";
import AddressesForm from "@/features/cart/addresses-form";
import Container from "@/features/phonecase/container";

type CartItem = {
  id: string;
  design: {
    id: number;
    name: string;
    image_url: string;
  };
  phone_model: {
    id: string;
    brand: string;
    model: string;
    price: string;
  };
};

const CartItemSkeleton = () => (
  <CardComp dir="ltr">
    <CardContent className="flex px-2 gap-4">
      <div className="w-32">
        <Skeleton className="w-full h-40 rounded-lg" />
      </div>
      <div className="flex w-full justify-between py-2 flex-col">
        <div className="flex gap-2 flex-col">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-9 w-9" />
        </div>
      </div>
    </CardContent>
  </CardComp>
);

const CartSkeleton = () => (
  <div className="p-6 max-w-3xl mx-auto">
    <h1 className="text-2xl font-bold mb-4">🛒 سبد خرید</h1>

    <div className="space-y-4">
      {[...Array(2)].map((_, i) => (
        <CartItemSkeleton key={i} />
      ))}

      {/* Address Form Skeleton */}
      <div className="pt-4 border-t mt-4">
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>

      {/* Total Price Skeleton */}
      <div className="flex justify-between items-center pt-4 border-t mt-4">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-6 w-32" />
      </div>

      {/* Button Skeleton */}
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
  </div>
);

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();

        if (Array.isArray(data)) {
          setCart(data);
        } else {
          setCart([]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setCart([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const deleteItem = async (id: string) => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setCart((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Delete item error:", error);
    }
  };

  const totalPrice = cart.reduce((sum, item) => {
    return sum + Number(item.phone_model.price);
  }, 0);

  if (loading) {
    return <CartSkeleton />;
  }

  return (
    <div className=" max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛒 سبد خرید</h1>
      {cart.length === 0 ? (
        <div className="flex justify-center flex-col items-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-lg text-muted-foreground mb-2">سبد خرید خالیه</p>
          <p className="text-sm text-muted-foreground">
            میتونی چندتا محصول اضاف کنی برای خودت🥀
          </p>
          <div className="w-full p-12">
            <Container />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <CardComp dir="ltr" key={item.id}>
              <CardContent className="flex px-2 gap-4">
                <div className="w-32 pointer-events-none">
                  <Card image_url={item.design.image_url} />
                </div>
                <div className="flex w-full justify-between py-2 flex-col">
                  <div className="flex gap-1 flex-col">
                    <p className="font-semibold">{item.design.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.phone_model.model}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-md">
                      {Number(item.phone_model.price).toLocaleString()} تومان
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteItem(item.id)}
                      className="hover:bg-red-50"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </CardComp>
          ))}

          <div className="pt-4 border-t mt-4">
            <AddressesForm />
          </div>

          <div className="flex justify-between items-center pt-4 border-t mt-4">
            <p className="font-semibold text-lg">مجموع:</p>
            <p className="text-xl font-bold">
              {totalPrice.toLocaleString()} تومان
            </p>
          </div>

          <Button
            className="w-full hoveranim bg-white text-black font-medium py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            size={"lg"}
            onClick={() => alert("پرداخت")}
          >
            ادامه خرید و پرداخت
          </Button>
        </div>
      )}
    </div>
  );
}
