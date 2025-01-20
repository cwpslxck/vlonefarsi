export async function loadProducts() {
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
    console.log(products);

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
