"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import LoadingPart from "./LoadingPart";

export default function ProductContainer() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const products = await response.json();

        setProducts(products);
      } catch (err: any) {
        setError(`Failed To Load Products: ${err}`);
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
          {error}
        </>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {products.map((p) => (
            <ProductCard key={p.title} title={p.title} image={p.image} />
          ))}
        </div>
      )}
    </>
  );
}
