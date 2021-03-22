import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import fareData from "../../assets/fares.json";
import "./styles.css";

const FareWidget = (props) => {
  const parseFareData = JSON.parse(JSON.stringify(fareData));

  const Option = (props) => {
    return (
      <components.Option {...props}>
        <div>{props.data.label}</div>
        <div style={{ fontSize: 12 }}>{props.data.subLabel}</div>
      </components.Option>
    );
  };

  const [showZoneOptions, setShowZoneOptions] = useState("CCP/1");
  const [setTimeOption, setShowTimeOption] = useState("");
  const [purchaseMethod, setPurchaseMethod] = useState("");
  const [numberOfFares, setNumberOfFares] = useState(1);
  const [totalFare, setTotalFare] = useState(1);

  const timeOptions = [
    { label: "Week Day", subLabel: fareData.info.weekday, value: "weekday" },
    {
      label: "Evening or Weekends",
      subLabel: fareData.info.evening_weekend,
      value: "evening_weekend",
    },
    {
      label: "Anytime",
      subLabel: fareData.info.anytime + " and more cost effective per ride!",
      value: "anytime",
    },
  ];

  const zoneOptions = fareData.zones.map(({ name, zone }) => {
    return { label: name, value: zone };
  });

  const handleNumberOfFares = (value) => {
    setNumberOfFares(value);
  };

  useEffect(() => {
    if (showZoneOptions && setTimeOption && purchaseMethod && numberOfFares) {
      setTotalFare(
        parseFareData.zones
          .find(({ zone }) => {
            return showZoneOptions.value === zone;
          })
          .fares.find(
            ({ purchase, type }) =>
              purchase === purchaseMethod && type === setTimeOption
          ).price * numberOfFares
      );
    } else if (
      showZoneOptions &&
      setTimeOption &&
      purchaseMethod &&
      numberOfFares
    ) {
      setTotalFare(
        parseFareData.zones
          .find(({ zone }) => {
            return showZoneOptions.value === zone;
          })
          .fares.find(
            ({ purchase, type }) =>
              purchase === purchaseMethod && type === setTimeOption
          ).price
      );
    }
  }, [showZoneOptions, setTimeOption, purchaseMethod, numberOfFares]);

  console.log(setTimeOption);

  return (
    <div className="fare-widget__page">
      <div className="fare-widget__container">
        <h1>Please Select Options To Purchase Your Fare</h1>
        <p className="fare-widget__dropdown-label">Where are you going?</p>
        <Select
          className="fare-widget__dropdown"
          name="zones"
          options={zoneOptions}
          onChange={(value) => {
            setShowZoneOptions(value);
          }}
        />
        <p className="fare-widget__dropdown-label">What type of pass would you like?</p>
        <Select
          className="fare-widget__dropdown"
          components={{ Option }}
          options={timeOptions}
          onChange={async ({ value }) => {
            setShowTimeOption(value);
          }}
        />
        {setTimeOption === "weekday" && (
          <div>
            <div
              onChange={(e) => {
                setPurchaseMethod(e.target.value);
              }}
            >
              <div>
                <div className="fare-widget__onboard-purchase-button-container">
                  <span className="fare-widget__onboard-purchase-tooltip">
                    {fareData.info.onboard_purchase}
                  </span>
                  <input type="radio" value="onboard_purchase" name="onboard" />
                  Onboard
                </div>
                <div className="fare-widget__advance-purchase-button-container">
                  <span className="fare-widget__advance-purchase-tooltip">
                    {fareData.info.advance_purchase}
                  </span>
                  <input type="radio" value="advance_purchase" name="advance" />
                  Advance
                </div>
              </div>
            </div>
            <input
              className="fare-widget__fare-quanity-picker"
              type="number"
              min="1"
              max="9"
              options={numberOfFares}
              onChange={(e) => {
                // console.log("setNumberOfFares", e.target.value);
                handleNumberOfFares(parseInt(e.target.value));
              }}
            />
          </div>
        )}
        {setTimeOption === "evening_weekend" && (
          <div>
            <div
              onChange={(e) => {
                setPurchaseMethod(e.target.value);
              }}
            >
              <div>
                <div className="fare-widget__onboard-purchase-button-container">
                  <span className="fare-widget__onboard-purchase-tooltip">
                    {fareData.info.onboard_purchase}
                  </span>
                  <input type="radio" value="onboard_purchase" name="onboard" />
                  Onboard
                </div>
                <div className="fare-widget__advance-purchase-button-container">
                  <span className="fare-widget__advance-purchase-tooltip">
                    {fareData.info.advance_purchase}
                  </span>
                  <input type="radio" value="advance_purchase" name="advance" />
                  Advance
                </div>
              </div>
            </div>
            <input
              className="fare-widget__fare-quanity-picker"
              type="number"
              min="1"
              max="9"
              options={numberOfFares}
              onChange={(e) => {
                // console.log("setNumberOfFares", e.target.value);
                handleNumberOfFares(parseInt(e.target.value));
              }}
            />
          </div>
        )}
        {setTimeOption === "anytime" && (
          <div>
            <div
              onChange={(e) => {
                setPurchaseMethod(e.target.value);
              }}
            >
              <div>
                <div className="fare-widget__advance-purchase-button-container">
                  <span className="fare-widget__advance-purchase-tooltip">
                    {fareData.info.advance_purchase}
                  </span>
                  <input type="radio" value="advance_purchase" name="advance" />
                  Advance
                </div>
              </div>
            </div>
          </div>
        )}
        <h1>${totalFare === 1 ? "0" : totalFare}</h1>
      </div>
    </div>
  );
};

export default FareWidget;
