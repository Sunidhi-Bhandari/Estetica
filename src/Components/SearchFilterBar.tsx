import React from "react";
import "../styles/SearchFilterBar.css"
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSearchQuery, setCategory } from "../features/products/productsSlice";

const categories = ["", "Hair", "Skin", "Nails", "Grooming"];

const SearchFilterBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchQuery, category } = useAppSelector(s => s.products);

  return (
    <div className="bar">
      <input
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        placeholder="Search products..."
        className="search"
      />
      <select value={category} onChange={(e) => dispatch(setCategory(e.target.value))} className="select">
        {categories.map(c => <option key={c} value={c}>{c || "All categories"}</option>)}
      </select>
    </div>
  );
};

export default SearchFilterBar;
