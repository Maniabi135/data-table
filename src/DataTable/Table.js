import React, { useContext } from "react";
import { DataTableContext } from "../App";

const Table = () => {
  const { data = [] } = useContext(DataTableContext);
  const headers = (data?.length && Object.keys(data[0])) || [];

  const convertToDateFormat = (milsec = new Date()) => {
    const date = new Date(milsec);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month > 9 ? month : "0" + month}-${
      day > 9 ? day : "0" + day
    }`;
  };

  const getRecord = (item, key) => {
    return item[key] && key.toLowerCase().indexOf("date") >= 0
      ? convertToDateFormat(item[key])
      : item[key] || "--";
  };
  
  return data?.length ? (
    <div className="tableViewSection">
      {headers.map((key, ptIdx) => (
        <div className="tableCont" key={`${key.split(" ").join("")}Head`}>
          <div className="tableHeader">{key}</div>
          {data?.map((item, cdIdx) => (
            <div className="tableColumn" key={`${item[key]}${ptIdx}${cdIdx}Row`}>
              {getRecord(item, key)}
            </div>
          ))}
        </div>
      ))}
    </div>
  ) : (
    <div className="noDataFound">No data found</div>
  );
};

export default Table;
