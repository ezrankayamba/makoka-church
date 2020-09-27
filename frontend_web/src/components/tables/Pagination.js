import React from "react";
import MatIcon from "../icons/MatIcon";

function Pagination({ pageNo, onPageChanged, lastPage }) {
  const handlePrev = () => {
    let newPage = pageNo > 1 ? pageNo - 1 : 1;
    if (onPageChanged) {
      onPageChanged(newPage);
    }
  };
  const handleNext = () => {
    let newPage = pageNo + 1;
    if (onPageChanged) {
      onPageChanged(newPage);
    }
  };
  return (
    <ul className="pagination">
      <li className="btn-wrap">
        <button onClick={handlePrev} disabled={pageNo <= 1}>
          <MatIcon name="keyboard_arrow_left" /> Previous
        </button>
      </li>
      <li>
        <span>Page {pageNo}</span>
      </li>
      <li className="btn-wrap">
        <button onClick={handleNext} disabled={lastPage}>
          Next <MatIcon name="keyboard_arrow_right" />
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
