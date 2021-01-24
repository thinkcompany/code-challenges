import { useEffect, useState } from "react";
import "./SeptaFareCalculator.css";

const SeptaFareCalculator = () => {
  const [fareInfo, setFareInfo] = useState(null);
  const [zones, setZones] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://my-json-server.typicode.com/zackmckenna/fares/db`)
      .then((res) => res.json())
      .then((data) => {
        setFareInfo(data.info);
        setZones(data.zones);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <div className="septaFareCalculator">
      <h1>Regional Rail Rates</h1>
      <div>
        <label>Where are you going?</label>
        <select>
          <option>Zone4</option>
        </select>
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
};

export default SeptaFareCalculator;
