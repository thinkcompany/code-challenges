import React, { useContext } from "react";
import { AppContext } from "../App";

const Dropdown = ({ type }) => {
  const { data, zone, setZone, infoType, setInfoType, setTickets } =
    useContext(AppContext);

  return (
    <div>
      {type === "zone" ? (
        <select onChange={(e) => setZone(e.target.value)} value={zone}>
          {data &&
            data.zones.map((zone) => (
              <option key={zone.zone}>{zone.name}</option>
            ))}
        </select>
      ) : (
        <select
          onChange={(e) => {
            if (infoType !== "anytime" || infoType !== "Anytime") {
              setTickets(1);
            }
            setInfoType(e.target.value);
          }}
          value={infoType}
        >
          {data &&
            Object.keys(data.info).map((info, idx) => {
              let selection;
              if (!info.includes("purchase")) {
                // Exclude types of purchases
                // Format string for dropdown
                selection = info
                  .replace("_", " ")
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");
              } else {
                return undefined;
              }

              return <option key={idx}>{selection}</option>;
            })}
        </select>
      )}
    </div>
  );
};

export default Dropdown;
