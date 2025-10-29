import React from "react";
import "../styles/Pagination.css"

type Props = { page: number; totalPages: number; onPage: (p:number)=>void };

const Pagination: React.FC<Props> = ({ page, totalPages, onPage }) => {
  return (
    <div className="page">
      <button onClick={() => onPage(Math.max(1, page-1))} disabled={page===1}>Prev</button>
      <div>Page {page} of {totalPages}</div>
      <button onClick={() => onPage(Math.min(totalPages, page+1))} disabled={page===totalPages}>Next</button>
    </div>
  );
};

export default Pagination;
