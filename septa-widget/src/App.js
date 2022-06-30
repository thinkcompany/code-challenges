// TODO: refactor fare calculation code in a more efficient and DRY method
// TODO: eliminate the ability for a user to select any fewer than 10 anytime tickets

// Hello Think Company!

import React, { useEffect, useState } from "react";
import "./App.css";
import API from "./utils/API";
import Header from "./Components/Header";
import Destination from "./Components/Destination";
import RideTime from "./Components/RideTime";
import PurchaseLocation from "./Components/PurchaseLocation";
import Quantity from "./Components/Quantity";
import Total from "./Components/Total"

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
  }, [destination, rideTime, purchaseLocation, quantity]);

  // grabs the helper info for each fare timeframe and sets it to state
  const getRideTimeInfo = (rideTime) => {
    let info = fareData.info[rideTime];
    setRideTimeInfo(info);
  };

  // change handler for destination select
  const destinationChangeHandler = (e) => {
    const selectedDestination = e.target.value;
    setDestination(selectedDestination);
  }

  // change handler for ride time select
  const rideTimeChangeHandler = (e) => {
    const selectedRideTime = e.target.value;
    setRideTime(selectedRideTime);
    getRideTimeInfo(selectedRideTime);
    if (selectedRideTime === "anytime") {
      setAnytime(true)
    } else {
      setAnytime(false)
    }
  }

  // change handler for purchase location radio buttons
  const purchaseLocationChangeHandler = (e) => {
    const selectedPurchaseLocation = e.target.value;
    setPurchaseLocation(selectedPurchaseLocation);
    // if (anytime) {
    //   setPurchaseLocation("station-kiosk")
    // } else {
    //   setPurchaseLocation(selectedPurchaseLocation)
    // }
  }

  // change handler for quantity input
  const quantityChangeHandler = (e) => {
    const selectedQuantity = e.target.value;
    setQuantity(selectedQuantity);
    if (anytime) {
      setQuantity("10")
    } 
  }

  // a function to calculate fares based on user input
  const getFare = (zone, when, where, howMany) => {

    // zone 1 fare calculation
    if (zone === "1") {
        if (when === "weekday" && where === "station-kiosk") {
        let fare = fareData.zones[0].fares[0].price;
        setTotal(fare * howMany);
      } else if (when === "weekday" && where === "onboard") {
        let fare = fareData.zones[0].fares[1].price;
        setTotal(fare * howMany);
      } else if (when === "evening_weekend" && where === "station-kiosk") {
        let fare = fareData.zones[0].fares[2].price;
        setTotal(fare * howMany);
      } else if (when === "evening_weekend" && where === "onboard") {
        let fare = fareData.zones[0].fares[3].price;
        setTotal(fare * howMany);
      } else if (when === "anytime" && where === "station-kiosk" &&  howMany === "10") {
        let fare = fareData.zones[0].fares[4].price;
        setTotal(fare);
      }
    // zone 2 fare calculation
    } else if (zone === "2") {
        if (when === "weekday" && where === "station-kiosk") {
        let fare = fareData.zones[1].fares[0].price;
        setTotal(fare * howMany);
      } else if (when === "weekday" && where === "onboard") {
        let fare = fareData.zones[1].fares[1].price;
        setTotal(fare * howMany);
      } else if (when === "evening_weekend" && where === "station-kiosk") {
        let fare = fareData.zones[1].fares[2].price;
        setTotal(fare * howMany);
      } else if (when === "evening_weekend" && where === "onboard") {
        let fare = fareData.zones[1].fares[3].price;
        setTotal(fare * howMany);
      } else if (when === "anytime" && where === "station-kiosk" &&  howMany === "10") {
        let fare = fareData.zones[1].fares[4].price;
        setTotal(fare);
      }
    }
      // zone 3 fare calculation
      else if (zone === "3") {
        if (when === "weekday" && where === "station-kiosk") {
        let fare = fareData.zones[2].fares[0].price;
        setTotal(fare * howMany);
      } else if (when === "weekday" && where === "onboard") {
        let fare = fareData.zones[2].fares[1].price;
        setTotal(fare * howMany);
      } else if (when === "evening_weekend" && where === "station-kiosk") {
        let fare = fareData.zones[2].fares[2].price;
        setTotal(fare * howMany);
      } else if (when === "evening_weekend" && where === "onboard") {
        let fare = fareData.zones[2].fares[3].price;
        setTotal(fare * howMany);
      } else if (when === "anytime" && where === "station-kiosk" &&  howMany === "10") {
        let fare = fareData.zones[2].fares[4].price;
        setTotal(fare);
      }
    } else if (zone === "4") {
        // zone 4 fare calculation
      if (when === "weekday" && where === "station-kiosk") {
        let fare = fareData.zones[3].fares[0].price;
        setTotal(fare * howMany);
      } else if (when === "weekday" && where === "onboard") {
        let fare = fareData.zones[3].fares[1].price;
        setTotal(fare * howMany);
      } else if (when === "evening_weekend" && where === "station-kiosk") {
        let fare = fareData.zones[3].fares[2].price;
        setTotal(fare * howMany);
      } else if (when ==="evening_weekend" && where === "onboard") {
        let fare = fareData.zones[3].fares[3].price;
        setTotal(fare * howMany);
      } else if (when === "anytime" && where === "station-kiosk" &&  howMany === "10") {
        let fare = fareData.zones[3].fares[4].price;
        setTotal(fare);
      }
    } else if (zone === "5") {
      // zone 5 fare calculation
      if (when === "weekday" && where === "station-kiosk") {
        let fare = fareData.zones[4].fares[0].price;
        setTotal(fare * howMany);
      } else if (when === "weekday" && where === "onboard") {
        let fare = fareData.zones[4].fares[1].price;
        setTotal(fare * howMany);
      } else if (when === "evening_weekend" && where === "station-kiosk") {
        let fare = fareData.zones[4].fares[2].price;
        setTotal(fare * howMany);
      } else if (when === "evening_weekend" && where === "onboard") {
        let fare = fareData.zones[4].fares[3].price;
        setTotal(fare * howMany);
      } else if (when === "anytime" && where === "station-kiosk" &&  howMany === "10") {
        let fare = fareData.zones[4].fares[4].price;
        setTotal(fare);
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
        />

        {/* user select for number of tickets */}
        <Quantity 
          quantity={quantity}
          quantityChangeHandler={quantityChangeHandler}
        />
        
        {/* shows the total to the user */}
        <Total 
         total={total}
        />
        
      </div>
    </div>
  );
}

export default App;

// END OF LINE
