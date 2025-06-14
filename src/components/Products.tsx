import React, { useEffect, useState } from "react";
import { getDbTeste } from "../services/ecommerce/Ecommerce";
import ProductCard from "./cards/ProductCard";
import { startScreenLoader, stopScreenLoader } from "../utils/utils";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number | string;
  image?: string;
  tags?: string[];
  rating: number;
};

function filterByBetterRating(products: Product[], betterRating?: boolean) {
  if (betterRating) {
    return products.filter((product) => product.rating > 4.6);
  }
  return products;
}

function normalize(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function filterBySearch(products: Product[], search: string) {
  if (!search) return products;
  const terms = normalize(search).split(/\s+/).filter(Boolean);
  return products.filter((p) => {
    const name = normalize(p.name);
    const description = normalize(p.description);
    return terms.every(
      (term) => name.includes(term) || description.includes(term)
    );
  });
}

interface ProductsProps {
  betterRating?: boolean;
  title?: string;
  searchFilter?: boolean;
}

const Products: React.FC<ProductsProps> = ({
  betterRating = false,
  title = "Produtos",
  searchFilter = false,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    startScreenLoader();
    getDbTeste()
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(
            data.map((item) => ({
              id: Number(item.id),
              name: item.name,
              description: item.description,
              image: item.image || "https://via.placeholder.com/150",
              price: item.price,
              tags: item.tags,
              rating: item.rating ?? 4.5,
            }))
          );
        } else {
          setProducts([]);
        }
      })
      .finally(() => {
        stopScreenLoader();
      });
  }, []);

  let filteredProducts = filterByBetterRating(products, betterRating);
  filteredProducts = filterBySearch(filteredProducts, search);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-200">{title}</h2>
      {searchFilter && (
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={String(product.id)}
            name={product.name}
            description={product.description}
            price={Number(product.price)}
            category="Categoria Exemplo"
            image={product.image || "https://via.placeholder.com/150"}
            rating={product.rating}
            tags={product.tags || []}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
