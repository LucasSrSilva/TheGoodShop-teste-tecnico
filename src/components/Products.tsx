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

const PRODUCTS_PER_PAGE = 10;

const Products: React.FC<ProductsProps> = ({
  betterRating = false,
  title = "Produtos",
  searchFilter = false,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

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
              image: item.image,
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

  useEffect(() => {
    setCurrentPage(1);
  }, [search, betterRating]);

  let filteredProducts = filterByBetterRating(products, betterRating);
  filteredProducts = filterBySearch(filteredProducts, search);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

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
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold text-gray-400 mb-2">Nenhum produto encontrado</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={String(product.id)}
              name={product.name}
              description={product.description}
              price={Number(product.price)}
              category="Categoria Exemplo"
              image={product.image || "https://as1.ftcdn.net/v2/jpg/12/66/64/88/1000_F_1266648896_E5z5wP1QGOyzJtNjaI6KY5wARKsU8HOz.jpg"}
              rating={product.rating}
              tags={product.tags || []}
            />
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 cursor-pointer"}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
