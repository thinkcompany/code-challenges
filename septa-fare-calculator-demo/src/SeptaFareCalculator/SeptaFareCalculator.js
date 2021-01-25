import { useEffect, useState } from "react";
import "./SeptaFareCalculator.css";
import Select from "./Select";
import Input from "./Input";
import RadioSelect from "./RadioSelect";

const SeptaFareCalculator = () => {
  const [fareInfo, setFareInfo] = useState(null);
  const [zones, setZones] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [zoneInput, setZoneInput] = useState(null);
  const [timeInput, setTimeInput] = useState(null);
  const [numberOfRidesInput, setNumberOfRidesInput] = useState(1);
  const [purchase, setPurchase] = useState(null);

  const labels = [
    "Where are you going?",
    "When are you riding?",
    "Where will you purchase the fare?",
    "How many rides will you need?",
  ];

  // TODO: fiogure out how to pull this from incoming data
  const availableTimes = [
    {
      text: "Weekday",
      value: "weekday",
    },
    {
      text: "Evening/Weekend",
      value: "evening_weekend",
    },
    {
      text: "Anytime",
      value: "anytime",
    },
  ];

  const purchaseOptions = [
    {
      text: "Onboard",
      value: "onboard_purchase",
    },
    {
      text: "Station Kiosk",
      value: "advance_purchase",
    },
  ];

  const createOptions = (data, value, text) => {
    return data.map((item) => {
      return {
        text: item[text],
        value: item[value],
      };
    });
  };

  const handleRadioChange = (e) => {
    console.log(e);
    console.log(e.target.value);
  };

  useEffect(() => {
    fetch(`http://my-json-server.typicode.com/zackmckenna/fares/db`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFareInfo(data.info);
        setZones(data.zones);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (!loading) {
    return (
      <div className="septaFareCalculator">
        <h1>Regional Rail Rates</h1>
        <div>
          <Select
            label={labels[0]}
            options={createOptions(zones, "zone", "name")}
            onChange={(e) => setZoneInput(e.target.value)}
            id="zone-select"
          />
        </div>
        <div>
          <Select
            label={labels[1]}
            options={availableTimes}
            onChange={(e) => setTimeInput(e.target.value)}
            id="zone-select"
          />
        </div>
        <div>
          <RadioSelect
            onChange={(e) => setPurchase(e.target.value)}
            legend={labels[2]}
            options={purchaseOptions}
            id="purchase-select"
            value={purchase}
          />
        </div>
        <div>
          <Input
            label={labels[3]}
            type="number"
            onChange={(e) => setNumberOfRidesInput(e.target.value)}
            value={numberOfRidesInput}
          />
        </div>
        <div>Result</div>
      </div>
    );
  } else {
    return <p>{error ? "Error loading page" : " loading..."}</p>;
  }
};

export default SeptaFareCalculator;
