import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import ProductCard from "../Components/ProductCard";
import SearchFilterBar from "../Components/SearchFilterBar";
import Pagination from "../Components/Pagination";
import { setPage } from "../features/products/productsSlice";
import "../styles/ProductListPage.css"

const ProductListPage: React.FC = () => {
  const { products, searchQuery, category, page, perPage } = useAppSelector(s => s.products);
  const dispatch = useAppDispatch();

  const filtered = products.filter(p => {
    const matchQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || (p.description ?? "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = category ? p.category === category : true;
    return matchQuery && matchCat;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const start = (page - 1) * perPage;
  const current = filtered.slice(start, start + perPage);

  return (
    <div className="page">
      <SearchFilterBar />
      <div className="grid">
        {current.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      <Pagination page={page} totalPages={totalPages} onPage={(p)=> dispatch(setPage(p))} />
    </div>
  );
};

export default ProductListPage;
