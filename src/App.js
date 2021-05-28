import React, { useState, useEffect, createContext } from "react";
import DateInput from "./Filters/DateInput";
import RangeInput from "./Filters/RangeInput";
import OrderStatus from "./Filters/OrderStatus";
import Datatable from "./DataTable/DataTable";
import { API_URLS, makeApi } from "./ApiUtils";

let cancelRequest = null;

const DataTableContext = createContext(null);

function App() {
  const [loader, setLoader] = useState(true);
  const [tableLoader, setTableLoader] = useState(false);
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [tabList, setTabList] = useState("");
  const [dateList, setDateList] = useState("");
  const [rangeList, setRangeList] = useState("");
  const [filterData, setFilterData] = useState("");
  const [totalCount, setTotalCount] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [dataLimit, setDataLimit] = useState("");
  const [htmlTable, setHtmlTable] = useState("");

  const filterAction = async obj => {
    const data = { ...filterData, ...obj };
    setTableLoader(true);
    setFilterData(data);
    try {
      const config = {
        url: API_URLS.filterData,
        method: "POST",
        data
      };
      if (cancelRequest !== null) {
        cancelRequest("cancel");
        cancelRequest = null;
      }
      const cancelRequestCallback = value => {
        cancelRequest = value;
      };
      let res = await makeApi(config, cancelRequestCallback);
      if (res?.data) {
        const {
          pageNo = 1,
          pageLimt = 10,
          totalRecord = 0,
          data = [],
          htmlTableDom
        } = res.data;
        setTotalCount(totalRecord);
        setDataLimit(pageLimt);
        setCurrentPage(pageNo);
        setHtmlTable(htmlTableDom);
        setData(data);
      } else {
        console.log("Failed fetching data");
      }
      setTableLoader(false);
    } catch (err) {
      setTableLoader(false);
      console.log(err, "Failed fetching data");
    }
  };

  const constructData = (resData = {}) => {
    const {
      activeTab: status = "",
      navSteps = [],
      salesData = [],
      priceRanges = {},
      dateRanges = [],
      pageNo = 0,
      totalRecord = 0,
      pageLimit = 10,
      htmlTableDom = ""
    } = resData;
    setActiveTab(status);
    setTabList(navSteps);
    setDateList(dateRanges);
    setRangeList(priceRanges);
    setData(salesData);
    setTotalCount(totalRecord);
    setCurrentPage(pageNo);
    setDataLimit(pageLimit);
    setHtmlTable(htmlTableDom);
    setFilterData({
      status,
      [dateRanges[0].id]: new Date(dateRanges[0]["value"]).getTime(),
      [dateRanges[1].id]: new Date(dateRanges[1]["value"]).getTime(),
      startingPrice: priceRanges["startRange"],
      endingPrice: priceRanges["endRange"],
      currentPage: pageNo,
      limit: pageLimit
    });
    setLoader(false);
  };

  const getSalesData = async () => {
    try {
      const config = {
        url: API_URLS.allData
      };
      let res = await makeApi(config);
      if (res?.data) {
        constructData(res.data);
      } else {
        setLoader(false);
        console.log("Failed fetching data");
      }
    } catch (err) {
      setLoader(false);
      console.error(err);
    }
  };

  useEffect(() => {
    getSalesData();
  }, []);

  return (
    <div className="App">
      <header className="header">
        <nav>
          <i className="material-icons">menu</i>
          <span className="logoName">Dashboard</span>
        </nav>
      </header>
      <section>
        {!loader && (
          <>
            <div className="filterSection">
              {tabList?.length && (
                <OrderStatus
                  tabList={tabList}
                  filterCbk={filterAction}
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                />
              )}
              {dateList?.length &&
                dateList.map(item => (
                  <DateInput key={item.id} {...item} filterCbk={filterAction} />
                ))}
              <RangeInput {...rangeList} filterCbk={filterAction} />
            </div>
            {!tableLoader && (
              <DataTableContext.Provider
                value={{
                  data,
                  totalCount,
                  setCurrentPage,
                  currentPage,
                  filterAction,
                  dataLimit
                }}
              >
                <Datatable />
              </DataTableContext.Provider>
            )}
            {!tableLoader && (
              <div
                className="dataTableSection dynamicTable"
                dangerouslySetInnerHTML={{ __html: htmlTable }}
              />
            )}
            {tableLoader && <div>Table loading</div>}
          </>
        )}
        {loader && <div className="pageLoader">Loading</div>}
      </section>
    </div>
  );
}

export default App;
export { DataTableContext };
