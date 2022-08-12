import React, { useEffect, useState } from "react";
// css module helps to contain class names within only the files it is imported to
import style from "./App.module.css";
// makes browsers render all elements more consistantly
import "normalize.css";
import testData from "./fares.json";
import { ReactComponent as SeptaLogo } from "./septa_logo.svg";

/*
  Todo:
  - import fares
    - parse info and zone specifics

*/ type fareModel = {
  type: string;
  purchase: string;
  trips: number;
  price: number;
};

type zoneType = {
  name: string;
  zone: number;
  fares: Array<fareModel>;
};
type zonesType = Array<zoneType>;
type infoType = { [k: string]: string };

function App() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [zones, setZones] = useState<zonesType>(testData.zones);
  const [info, setInfo] = useState<infoType>(testData.info);
  const [zone, setZone] = useState(zones[0]);
  const [fareType, setFareType] = useState<keyof typeof info>(
    zone.fares[0].type
  );
  const [purchase, setPurchase] = useState(zone.fares[0].purchase);
  const [numRides, setNumRides] = useState(1);
  useEffect(() => {

    // fetch request to server if api were to exist
    fetch('septa.org/api/fares')
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('data could not be retrieved')
      })
      .then(data => {
        setZones(data.zones)
        setInfo(data.info)
      })
      // here we can set and display an error
      .catch(e => console.log('error', e))
      // we can easily set a loading animation while the fetch request is carried out
      .finally(() => setLoaded(true))

  }, []);
  // fare and total pricing is calculated with each render
  // if calculation were more complicated, useMemo could be utilized
  let rideFare = "$0.00";
  let totalFare = (() => {
    const fare = zone.fares.find(
      (fareInfo) => fareInfo.type === fareType && fareInfo.purchase === purchase
    );
    let dollar = "0.00";
    if (fare) {
      if (fare.type === "anytime") {
        if (numRides < 10) setNumRides(10);
        dollar = fare.price.toFixed(2);
        rideFare = `$${(fare.price / 10).toFixed(2)}`;
      } else {
        dollar = (numRides * fare.price).toFixed(2);
        rideFare = `$${fare.price.toFixed(2)}`;
      }
    }
    return `$${dollar}`;
  })();

  return (
    <div className={style.rail_fare_widget}>
      {!loaded && <div>Loading!</div>}
      {loaded && error && <p>{error}</p>}
      {loaded && !error && (
        <>
          <h1 className={style.title}>
            <SeptaLogo className={style.logo} />
            Regional Rail Fares
          </h1>
          <div className={style.zone}>
            <label htmlFor="zone_select">Where are you going?</label>
            <select
              id="zone_select"
              onChange={(e) =>
                setZone({
                  ...zones.find(
                    (zoneInfo) => zoneInfo.zone === parseInt(e.target.value, 10)
                  ),
                } as zoneType)
              }
              value={zone.zone}
            >
              {zones.map((zoneInfo) => {
                return (
                  <option key={zoneInfo.zone} value={zoneInfo.zone}>
                    {zoneInfo.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={style.fare_type}>
            <label htmlFor="fare_type">When are you riding?</label>
            <select
              id="fare_type"
              onChange={(e) => setFareType(e.target.value)}
              value={fareType}
            >
              {zone.fares
                .reduce((prev: fareModel[], curr: fareModel) => {
                  if (!prev.find((fareInfo) => fareInfo.type === curr.type))
                    prev.push(curr);
                  return prev;
                }, [])
                .map((fareInfo, i) => {
                  return (
                    <option key={`${i}_${fareInfo.type}`} value={fareInfo.type}>
                      {capitalizeFirstLetters(fareInfo.type.replace("_", " "))}
                    </option>
                  );
                })}
            </select>
            <p className={style.helper_text}>{info[fareType]}</p>
          </div>
          <div className={style.purchase_local}>
            <label>Where will you purchase the fare?</label>
            {zone.fares
              .filter((zoneInfo) => zoneInfo.type === fareType)
              .map((fareInfo) => {
                return (
                  <label htmlFor={fareInfo.purchase} key={fareInfo.purchase}>
                    <input
                      id={fareInfo.purchase}
                      checked={purchase === fareInfo.purchase}
                      onChange={(e) => setPurchase(fareInfo.purchase)}
                      type="radio"
                      value={fareInfo.purchase}
                      name="purchase"
                    />
                    {fareInfo.purchase === "advance_purchase"
                      ? "Station Kiosk"
                      : "Onboard"}
                  </label>
                );
              })}
          </div>
          <div className={style.ride_num}>
            <label htmlFor="ride_num">How many rides will you need?</label>
            <input
              id="ride_num"
              value={numRides}
              onChange={(e) => setNumRides(parseInt(e.target.value, 10))}
              type="number"
              min={fareType === "anytime" ? "10" : "1"}
              max="10"
            />
            {fareType !== "anytime" && numRides === 10 && (
              <p className={`${style.red_alert}`}>Max 10 rides at a time</p>
            )}
            {fareType === "anytime" && (
              <p className={style.helper_text}>
                "Anytime" fare is purchased in bulk
              </p>
            )}
          </div>
          <div className={style.total_fare}>
            <label>Your fare will cost</label>
            <p className={style.dollar_price}>{totalFare}</p>
            <p
              className={style.single_ride_dollar_price}
            >{`${rideFare} per ride`}</p>
          </div>
        </>
      )}
    </div>
  );
}

function capitalizeFirstLetters(string: string) {
  const words = string.split(" ");
  words.forEach((word, i) => {
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  });
  return words.join(" ");
}
export default App;
