import React from "react";

const OrderStatus = props => {
  const {
    tabList = [],
    filterCbk = () => {},
    setActiveTab = () => {},
    activeTab = "all"
  } = props;

  const clickAction = key => {
    setActiveTab(key);
    filterCbk({ status: key });
  };

  return (
    <ul className="orderStatusSection">
      {tabList?.map(item => {
        const isActive = activeTab?.toLowerCase() === item?.toLowerCase();
        return (
          <li
            key={`${item}`}
            className={isActive ? "active" : ""}
            onClick={() => clickAction(item)}
          >
            <span className="stepName">{item}</span>
            {isActive && <span className="bar" />}
          </li>
        );
      })}
    </ul>
  );
};

export default OrderStatus;
