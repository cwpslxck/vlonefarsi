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

// تعریف تایپ برای داده‌های ذخیره شده در localStorage
interface CachedData {
  timestamp: number;
  products: Product[];
}

export default function ProductContainer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

        const products: Product[] = await response.json();
        setProducts(products);

        // Save the fetched data to localStorage with a timestamp
        const cachedData: CachedData = {
          timestamp: Date.now(),
          products: products,
        };
        localStorage.setItem("cachedProducts", JSON.stringify(cachedData));
      } catch (err) {
        setError(`Failed To Load Products: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    const cachedProducts = localStorage.getItem("cachedProducts");

    if (cachedProducts) {
      const parsedCachedData: CachedData = JSON.parse(cachedProducts);
      const now = Date.now();
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

      // Check if the cached data is older than 1 hour
      if (now - parsedCachedData.timestamp < oneHour) {
        // Use the cached data if it's still fresh
        setProducts(parsedCachedData.products);
        setLoading(false);
        return;
      }
    }

    // Fetch new data if there's no cached data or it's outdated
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
            <ProductCard id={p.id} key={p.id} title={p.title} image={p.image} />
          ))}
        </div>
      )}
    </>
  );
}
