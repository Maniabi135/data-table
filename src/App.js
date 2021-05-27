import React, { useState, useEffect } from "react";
import DateInput from "./Filters/DateInput";
import RangeInput from "./Filters/RangeInput";
import OrderStatus from "./Filters/OrderStatus";
import Datatable from "./DataTable";
import { API_URLS, makeApi } from "./ApiUtils";

let cancelRequest = null;

function App() {
  const [loader, setLoader] = useState(true);
  const [tableLoader, setTableLoader] = useState(false);
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [tabList, setTabList] = useState("");
  const [dateList, setDateList] = useState("");
  const [rangeList, setRangeList] = useState("");
  const [filterData, setFilterData] = useState("");

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
        setData(res?.data?.data || res?.data);
      } else {
        console.log("Failed fetching data");
      }
      setTableLoader(false);
    } catch (err) {
      console.log(err, "Failed fetching data");
    }
  };

  const constructData = (resData = {}) => {
    const {
      activeTab: status = "",
      navSteps = [],
      salesData = [],
      priceRanges = {},
      dateRanges = []
    } = resData;
    setActiveTab(status);
    setTabList(navSteps);
    setDateList(dateRanges);
    setRangeList(priceRanges);
    setData(salesData);
    setFilterData({
      status,
      [dateRanges[0].key]: dateRanges[0]["value"],
      [dateRanges[1].key]: dateRanges[1]["value"],
      startingPrice: priceRanges["startRange"],
      endingPrice: priceRanges["endRange"]
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
            {!tableLoader && <Datatable data={data} />}
            {tableLoader && <div>Table loading</div>}
          </>
        )}
        {loader && <div className="pageLoader">Loading</div>}
      </section>
    </div>
  );
}

export default App;
