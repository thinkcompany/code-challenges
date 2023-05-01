import React, { useContext } from "react";
import { AppContext } from "../App";

const Radio = ({ value, id }) => {
  const { purchaseType, setPurchaseType } = useContext(AppContext);

  return (
    <div>
      <input
        type="radio"
        id={id}
        value={value}
        onChange={(e) => setPurchaseType(e.target.value)}
        checked={purchaseType === value}
      />
      <label htmlFor={id}>{value}</label>
    </div>
  );
};

export default Radio;
