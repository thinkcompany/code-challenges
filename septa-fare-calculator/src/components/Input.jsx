import React, { useContext } from "react";
import { AppContext } from "../App";

const Input = () => {
  const { setTickets, tickets, setInfoType } = useContext(AppContext);
  return (
    <input
      type="number"
      value={tickets}
      min="1"
      max="10"
      onChange={(e) => {
        // Switch to Anytime and fix price when 10 trips are selected
        if (e.target.value === "10") {
          setInfoType("Anytime");
        }
        setTickets(e.target.value);
      }}
    />
  );
};

export default Input;
