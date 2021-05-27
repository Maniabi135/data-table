import React, { useState } from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";

const RangeInput = props => {
  const {
    filterCbk = () => {},
    endRange = "",
    startRange = "",
    maxValue = "",
    minValue = "",
    name = "",
    key = ""
  } = props;

  const [rangeValue, setRangeValue] = useState([minValue, maxValue]);

  const changeInput = val => {
    setRangeValue(val);
    filterCbk({ startingPrice: val[0], endingPrice: val[1] });
  };

  return (
    <div className="rangeInputSection">
      <label htmlFor={key}>{name}</label>
      <Range
        min={startRange}
        max={endRange}
        value={rangeValue}
        defaultValue={rangeValue}
        onChange={e => changeInput(e)}
      />
    </div>
  );
};

export default RangeInput;
