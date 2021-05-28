import React from "react";
import Table from "./Table";
import Pagination from "./Pagination";

const DataTable = () => {
  return (
    <div className="dataTableSection">
      <Table />
      <Pagination />
    </div>
  );
};

export default DataTable;
