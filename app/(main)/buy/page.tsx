"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card as CardComp, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Minus, Plus, Trash2 } from "lucide-react";
import Card from "@/features/phonecase/card";
import AddressesForm from "@/features/cart/addresses-form";
import Container from "@/features/phonecase/container";

type CartItem = {
  id: string;
  quantity: number;
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

// Loading Skeleton Component
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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between items-start gap-2">
          <Skeleton className="h-4 w-20" />
          <div className="flex gap-1 items-center">
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-9 w-9" />
            </div>
            <Skeleton className="h-9 w-9" />
          </div>
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

  const updateQuantity = async (id: string, newQty: number) => {
    if (newQty < 1) return;

    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, quantity: newQty }),
      });

      if (res.ok) {
        setCart((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, quantity: newQty } : item
          )
        );
      }
    } catch (error) {
      console.error("Update quantity error:", error);
    }
  };

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
    return sum + Number(item.phone_model.price) * item.quantity;
  }, 0);

  // Show skeleton while loading
  if (loading) {
    return <CartSkeleton />;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛒 سبد خرید</h1>
      {cart.length === 0 ? (
        <div className="flex justify-center flex-col items-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-lg text-muted-foreground mb-2">سبد خرید خالیه</p>
          <p className="text-sm text-muted-foreground">
            میتونی چندتا محصول اضاف کنی برای خودت🥀
          </p>
          <div className="w-full p-12">
            <Container limit={3} />
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
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between items-start gap-2">
                    <p className="text-md">
                      {item.quantity} x{" "}
                      {Number(item.phone_model.price).toLocaleString()} تومان
                    </p>
                    <div className="flex gap-1 items-center md:justify-end justify-center">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <span className="min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
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
