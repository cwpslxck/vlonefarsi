"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import LoadingPart from "./LoadingPart";

// تعریف تایپ محصول
interface Product {
  id: string;
  title: string;
  image: string;
}

export default function ProductContainer() {
  const [products, setProducts] = useState<Product[]>([]); // به جای any[] از Product[] استفاده شد
  const [loading, setLoading] = useState<boolean>(true); // مشخص کردن تایپ boolean
  const [error, setError] = useState<string | null>(null); // مشخص کردن تایپ error

  useEffect(() => {
    const fetchProducts = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      try {
        const response = await fetch(`${apiUrl}/api/products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const products: Product[] = await response.json(); // استفاده از تایپ Product برای داده‌های API
        setProducts(products);
      } catch (err) {
        setError(`Failed To Load Products: ${(err as Error).message}`); // تایپ کردن خطا
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {error || loading ? (
        <>
          <LoadingPart />
          {console.log(error)}
        </>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} title={p.title} image={p.image} />
          ))}
        </div>
      )}
    </>
  );
}
