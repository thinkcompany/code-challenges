import React from "react";

import CreateFareFrom from "./components/create_fare_form";

import Fares from "./fares.json";

function App() {
  const faresData = Fares;
  /* passing data from json as props to CreateFareForm*/
  return (
    <div>
      <CreateFareFrom faresData={faresData} />
    </div>
  );
}

export default App;
