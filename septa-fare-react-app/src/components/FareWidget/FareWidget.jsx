import React, { useState, useEffect } from "react";
import "./styles.css";

import "../../"

const FareWidget = () => {
  const [data, setData] = useState([]);
  const getData = () => {
    fetch("fares.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setData(myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>i am the widget</h1>
    </div>
  );
};

export default FareWidget;
