import React, { useState } from "react";

const DateInput = props => {
  const { filterCbk = () => {}, name = "", value = "", id = "" } = props;
  const [date, setDate] = useState(value);

  const changeInput = val => {
    setDate(val);
    filterCbk({ [id]: new Date(val).getTime() });
  };

  return (
    <div className="dateInputSection">
      <label htmlFor={id}>{name}</label>
      <input
        type="date"
        id={id}
        name={id}
        value={date}
        onChange={e => changeInput(e.currentTarget.value)}
      />
    </div>
  );
};

export default DateInput;
