import { useEffect, useState } from "react";

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

  return <h1>SeptaFareWidget</h1>;
};

export default SeptaFareCalculator;
