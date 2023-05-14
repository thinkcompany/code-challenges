"use-client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Nav from "../../components/Nav";
import MaxWidthContainer from "../../components/MaxWidthContainer";
import SelectInputWithLabel from "../../components/inputs/SelectInputWithLabel";
import RadioInputWithLabel from "../../components/inputs/RadioInputWithLabel";
import TextInputWithLabel from "../../components/inputs/TextInputWithLabel";
import FarePrice from "../../components/FarePrice";
import { zones, daytime, purchaseLocations } from "../../data/inputData";
import Tooltip from "@/components/Tooltip";

const Form = styled.form`
  width: 100%;
`;

const WidgetContainer = styled.div`
  width: 500px;
  border: solid 4px #ccc;
`;

const FairWidget = () => {
  // state to keep track of selected values
  const [selectedZone, setSelectedZone] = useState("CCP/1");
  const [selectedDaytime, setSelectedDaytime] = useState("Weekday");
  const [selectedPurchaseLocation, setSelectedPurchaseLocation] = useState("");
  const [selectedRides, setSelectedRides] = useState("");
  const [singleRidePrice, setSinglePriceRide] = useState(0);

  // calculates the total price for rides
  const calculateTotalRidePrice = (data) => {
    const { zones } = data; // destructure zones

    // filter for target zone
    const filteredZone = zones.filter((zone) => zone.name === selectedZone);
    const [zoneInfo] = filteredZone; // desctruct target zone info
    // filter target fare
    const filteredFare = zoneInfo?.fares.filter(
      (fare) =>
        fare?.type === selectedDaytime.toLocaleLowerCase() &&
        fare?.purchase === selectedPurchaseLocation.toLocaleLowerCase()
    );
    const [priceData] = filteredFare; // destruct fare info

    // set the singleRidePrice state to the price acquired from request
    if (priceData?.price && priceData?.price > 0)
      if (selectedDaytime === "Anytime") {
        setSinglePriceRide(priceData.price / 10);
      } else setSinglePriceRide(priceData.price);
  };

  /**
   * Makes request to get jason data in prepartion for fare pricing calculation
   */
  useEffect(() => {
    // avoid unnecessary request
    if (
      !selectedZone ||
      !selectedDaytime ||
      !selectedPurchaseLocation ||
      !selectedRides
    )
      return;

    // fetch json data
    const fetchData = async () => {
      const response = await fetch("data.json");
      const data = await response.json();
      calculateTotalRidePrice(data);
    };
    fetchData();
  }, [
    selectedZone,
    selectedDaytime,
    selectedPurchaseLocation,
    selectedRides,
    calculateTotalRidePrice,
  ]);

  return (
    <MaxWidthContainer>
      <Tooltip />
      <WidgetContainer>
        <Form>
          <Nav />
          <SelectInputWithLabel
            label="Where are you going?"
            inputName="zone"
            inputOptions={zones}
            setValue={setSelectedZone}
          />
          <SelectInputWithLabel
            label="When are you riding?"
            inputName="daytime"
            inputOptions={daytime}
            currentSelectedZone="Weekdays"
            setValue={setSelectedDaytime}
            daytimeSelected={selectedDaytime}
            includeHelperText
          />
          <RadioInputWithLabel
            label="Where will you purchase the fare?"
            inputOptions={purchaseLocations}
            currentPurchasedLocation={selectedPurchaseLocation}
            daytimeSelected={selectedDaytime}
            setPurchaseLocation={setSelectedPurchaseLocation}
          />
          <TextInputWithLabel
            label="How many rides will you need?"
            inputId="ridesCount"
            inputName="numberOfRides"
            setRideQuantity={setSelectedRides}
            rideQuantity={selectedRides}
            daytimeSelected={selectedDaytime}
          />
          <FarePrice
            pricePerRide={singleRidePrice}
            totalRides={selectedRides}
            daytimeSelected={selectedDaytime}
          />
        </Form>
      </WidgetContainer>
    </MaxWidthContainer>
  );
};

export default FairWidget;
