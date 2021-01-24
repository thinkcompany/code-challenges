import { useEffect, useState } from "react";
import "./SeptaFareCalculator.css";
import Select from "./Select";

const SeptaFareCalculator = () => {
  const [fareInfo, setFareInfo] = useState(null);
  const [zones, setZones] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [zoneInput, setZoneInput] = useState(null);

  const labels = [
    "Where are you going?",
    "When are you riding?",
    "Where will you purchase the fare?",
    "How many rides will you need?",
  ];

  const createOptions = (data, value, text) => {
    return data.map((item) => {
      return {
        text: item[text],
        value: item[value],
      };
    });
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
          <label>When are you riding?</label>
          <select>
            <option>Weekdays</option>
          </select>
        </div>
        <div>
          <label>Where will you purchase the fare?</label>
          <label>
            <input type="radio" value="onboard" />
            Onboard
          </label>
        </div>
        <div>
          <label>How many rides will you need?</label>
          <input type="number" />
        </div>
        <div>Result</div>
      </div>
    );
  } else {
    return <p>{error ? "Error loading page" : " loading..."}</p>;
  }
};

export default SeptaFareCalculator;
