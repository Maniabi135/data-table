import React, { useContext } from "react";
import { DataTableContext } from "../App";

const Pagination = () => {
  const {
    totalCount = 0,
    currentPage = 0,
    dataLimit = 10,
    setCurrentPage = () => {},
    filterAction = () => {}
  } = useContext(DataTableContext);

  const totalPages = Math.ceil(totalCount / dataLimit);

  const paginate = value => {
    const number =
      value === "prev"
        ? currentPage - 1
        : value === "next"
        ? currentPage + 1
        : value;
    setCurrentPage(number);
    filterAction({ currentPage: number });
  };

  return (
    (totalCount && totalCount > 10 && (
      <ul className="pagination">
        {(totalPages > 1 && (
          <li
            className={`prev ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => {
              currentPage !== 1 && paginate("prev");
            }}
          >
            <i className="material-icons" title="Previous">
              navigate_before
            </i>
          </li>
        )) ||
          ""}
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={`pageNo${index + 1}`}
            className={`pageNo ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </li>
        ))}
        {(totalPages > 1 && (
          <li
            className={`next ${currentPage === totalPages ? "disabled" : ""}`}
            onClick={() => {
              currentPage !== totalPages && paginate("next");
            }}
          >
            <i className="material-icons" title="Next">
              keyboard_arrow_right
            </i>
          </li>
        )) ||
          ""}
      </ul>
    )) ||
    ""
  );
};

export default Pagination;
