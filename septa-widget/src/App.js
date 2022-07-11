

// Hello Think Company!

import React, { useEffect, useState } from "react";
import "./App.css";
import API from "./utils/API";
import Header from "./Components/Header";
import Destination from "./Components/Destination";
import RideTime from "./Components/RideTime";
import PurchaseLocation from "./Components/PurchaseLocation";
import Quantity from "./Components/Quantity";
import Total from "./Components/Total";

function App() {
  // state variables
  const [fareData, setFareData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [destination, setDestination] = useState("");
  const [rideTime, setRideTime] = useState("");
  const [purchaseLocation, setPurchaseLocation] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [rideTimeInfo, setRideTimeInfo] = useState("");
  const [total, setTotal] = useState(0.0);
  const [anytime, setAnytime] = useState(false);

  // grabs fare data from fares.json file in the public folder and sets it to state
  useEffect(() => {
    API.getFareData()
      .then((res) => setFareData(res.data))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  // runs the getRate function anytime any of the corresponding state variables are changed
  // so as to keep a running total
  useEffect(() => {
    getFare(destination, rideTime, purchaseLocation, quantity);
  }, [destination, rideTime, purchaseLocation, quantity, anytime]);

  // grabs the helper info for each fare timeframe and sets it to state
  const getRideTimeInfo = (rideTime) => {
    // loops through the "info" key in the fareData object until a match is found.  Then the helper data is set to state once matched.
    for (let key in fareData) {
      if (key === "info") {
        for (let key1 in fareData[key]) {
          if (key1 === rideTime) {
            setRideTimeInfo(fareData[key][key1]);
          }
        }
      }
    }
  };

  // change handler for destination select
  const destinationChangeHandler = (e) => {
    const selectedDestination = e.target.value;
    setDestination(selectedDestination);
  };

  // change handler for ride time select
  const rideTimeChangeHandler = (e) => {
    const selectedRideTime = e.target.value;
    setRideTime(selectedRideTime);
    getRideTimeInfo(selectedRideTime);
  };

  // change handler for purchase location radio buttons
  const purchaseLocationChangeHandler = (e) => {
    const selectedPurchaseLocation = e.target.value;
    setPurchaseLocation(selectedPurchaseLocation);
  };

  // change handler for quantity input
  const quantityChangeHandler = (e) => {
    const selectedQuantity = e.target.value;
    setQuantity(selectedQuantity);
  };

  // a function to calculate fares based on user input
  const getFare = (zone, when, where, howMany) => {
    // convert the zone argument into a number and then subtract one to equal index of zones array
    // so that zone 2 matches index 1, for example
    const zoneInt = parseInt(zone) - 1;
    // loop through fareData object and if the key equals "zones"
    for (let key in fareData) {
      if (key === "zones") {
        // then loop through the zones array to match the zone argument
        // with the zone in the array
        for (let zone = 0; zone < fareData.zones.length; zone++) {
          if (zone === zoneInt) {
            // if the zone matches then it grabs the fares array from that object and puts it into a new array
            // that can be iterated over
            let fares = fareData.zones[zoneInt].fares;
            // loop over the fares array to find a match to the zone argument
            for (let j = 0; j < fares.length; j++) {
              // object of information of selected zone
              let fareObj = fares[j];
              // if "anytime is selected", set total to price of 10 "anytime tickets"
              if (when === "anytime" && fareObj.type === "anytime") {
                setPurchaseLocation("advance_purchase");
                setAnytime(true)
                setQuantity(10)
                setTotal(fareObj.price)
              }
              // set price to total for other ride times
               else if (fareObj.type === when && fareObj.purchase === where) {
                const totalFare = fareObj.price * howMany;
                setAnytime(false)
                setTotal(totalFare);
              }
            }
          }
        }
      }
    }
  };

  return (
    <div className="App">
      <div className="container">
        <Header />
        {/* user select for destination */}
        <Destination
          fareData={fareData}
          destination={destination}
          destinationChangeHandler={destinationChangeHandler}
          loading={loading}
        />
        {/* user select for ride time */}
        <RideTime
          rideTimeChangeHandler={rideTimeChangeHandler}
          rideTimeInfo={rideTimeInfo}
          rideTime={rideTime}
        />
        {/* user select for purchase location */}
        <PurchaseLocation
          purchaseLocationChangeHandler={purchaseLocationChangeHandler}
          purchaseLocation={purchaseLocation}
          anytime={anytime}
        />

        {/* user select for number of tickets */}
        <Quantity
          quantity={quantity}
          quantityChangeHandler={quantityChangeHandler}
        />

        {/* shows the total to the user */}
        <Total total={total} />
      </div>
    </div>
  );
}

export default App;

// END OF LINE
