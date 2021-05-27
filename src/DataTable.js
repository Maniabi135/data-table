import React from "react";

const DataTable = props => {
  const { data = [] } = props;
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

  return (
    <div className="dataTableSection">
      {data?.length ? (
        <div className="tableViewSection">
          {headers.map((key, ptIdx) => (
            <div className="tableCont" key={`${key.split(" ").join("")}Head`}>
              <div className="tableHeader">{key}</div>
              {data?.map((item, cdIdx) => (
                <div
                  className="tableBody"
                  key={`${item[key]}${ptIdx}${cdIdx}Row`}
                >
                  {key.toLowerCase().indexOf() === "date"
                    ? convertToDateFormat(item[key])
                    : item[key]}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="noDataFound">No data found</div>
      )}
    </div>
  );
};

export default DataTable;
