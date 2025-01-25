"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import LoadingPart from "./LoadingPart";

interface Product {
  id: string;
  title: string;
  image: string;
}

export default function ProductContainer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      // Check if cached data exists and is valid
      const cachedData = localStorage.getItem("cachedProducts");
      const cachedTimestamp = localStorage.getItem("cachedProductsTimestamp");

      if (cachedData && cachedTimestamp) {
        const currentTime = new Date().getTime();
        const cacheDuration = 60 * 60 * 1000;

        // Use cached data if it's still valid
        if (currentTime - parseInt(cachedTimestamp) < cacheDuration) {
          setProducts(JSON.parse(cachedData));
          setLoading(false);
          return;
        }
      }

      // Fetch new data from the API
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

        // Cache the new data and timestamp
        localStorage.setItem("cachedProducts", JSON.stringify(products));
        localStorage.setItem(
          "cachedProductsTimestamp",
          new Date().getTime().toString()
        );
      } catch (err) {
        setError(`Failed To Load Products: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Optionally, set up an interval to refresh data periodically
    const interval = setInterval(fetchProducts, 60 * 60 * 1000); // Refresh every 15 minutes

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
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
