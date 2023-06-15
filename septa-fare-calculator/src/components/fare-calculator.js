import { useEffect, useState } from "react";
import response from "./../data/fares.json";
import septaLogo from "./../assets/septa-logo.svg";
import {
  fareCalculatorConstants,
  radioButtonOptionsMapper,
  timeFrameOptions,
} from "./constants";
import { Input } from "./input";
import { Select } from "./select";

const zonesOptions = response.zones.map((option) => {
  return { value: option.zone, title: option.name };
});

export const FareCalculator = () => {
  const [rideTimeDescription, setRideTimeDescription] = useState(
    response.info.weekday
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [singeTicketPurchase, setSingeTicketPurchase] = useState(true);

  // default fare options can be set here
  const defaultFareOptions = {
    destinationZone: zonesOptions[0].value,
    rideTime: response.zones[0].fares[0].type,
    purchaseLocation: response.zones[0].fares[0].purchase,
    numberOfRides: singeTicketPurchase ? 1 : 10,
  };

  const [fareOptions, setFareOptions] = useState(defaultFareOptions);

  // Check if a single purchase or bulk (includes "anytime")
  useEffect(() => {
    if (fareOptions.rideTime === "anytime") {
      setFareOptions({
        ...fareOptions,
        purchaseLocation: "advance_purchase",
        numberOfRides: 10,
      });
      setSingeTicketPurchase(false);
    } else {
      setSingeTicketPurchase(true);
      setFareOptions({
        ...fareOptions,
        purchaseLocation: "onboard_purchase",
        numberOfRides: 1,
      });
    }

    setRideTimeDescription(response.info[fareOptions.rideTime]);
  }, [fareOptions.rideTime]);

  /* ASSUMPTION: should hide onBoard option if anytime selection has been made
    Checks locations based on the previous selection */

  /* @DEBT: should be simplified */
  const currentLocationsList = () => {
    const locationsList = response.zones
      .find((zone) => zone.zone === fareOptions.destinationZone)
      .fares.filter((zoneOption) => zoneOption.type === fareOptions.rideTime)
      .map((el) => el.purchase);
    const uniqueArray = [...new Set(locationsList)];

    const result = uniqueArray.map((el) => {
      return { value: el, title: radioButtonOptionsMapper[el] };
    });

    return result;
  };

  /* @DEBT: only happy path has been defined, should have an error state/message to display */
  const calculateFare = (fareOptions) => {
    const curZone =
      response &&
      response.zones.find(
        (curZone) => curZone.zone === fareOptions.destinationZone
      );
    const singeTicketInfo = curZone.fares.find(
      (fare) =>
        fare.type === fareOptions.rideTime &&
        fare.purchase === fareOptions.purchaseLocation
    );

    if (singeTicketInfo) {
      if (singeTicketInfo.trips === 1) {
        return singeTicketInfo.price * fareOptions.numberOfRides;
      } else if (singeTicketInfo.trips === 10) {
        return singeTicketInfo.price * (fareOptions.numberOfRides / 10);
      }
    }
  };

  useEffect(() => {
    setTotalPrice(calculateFare(fareOptions));
  }, [fareOptions]);

  return (
    <div className="fare-calculator">
      <div className="header border">
        <img src={septaLogo} width={40} alt="SEPTA logo" />
        <h2>{fareCalculatorConstants.title}</h2>
      </div>
      <Select
        title={fareCalculatorConstants.destinationZoneTitle}
        options={zonesOptions}
        onChange={(e) =>
          setFareOptions({
            ...fareOptions,
            destinationZone: Number(e.target.value),
          })
        }
      />
      <Select
        title={fareCalculatorConstants.timeTitle}
        options={timeFrameOptions}
        descriptionText={rideTimeDescription}
        onChange={(e) =>
          setFareOptions({ ...fareOptions, rideTime: e.target.value })
        }
      />
      <Input
        title={fareCalculatorConstants.purchaseLocationTitle}
        isTypeRadio={true}
        checked={fareOptions.purchaseLocation}
        buttonsList={currentLocationsList()}
        onChange={(e) =>
          setFareOptions({ ...fareOptions, purchaseLocation: e.target.value })
        }
      />
      <Input
        singeTicketPurchase={singeTicketPurchase}
        title={fareCalculatorConstants.numberOfRidesTitle}
        inputValue={fareOptions.numberOfRides}
        descriptionText={
          !singeTicketPurchase && fareCalculatorConstants.numberOfRidesInfoText
        }
        onChange={(e) =>
          setFareOptions({
            ...fareOptions,
            numberOfRides: Number(e.target.value),
          })
        }
      />
      <div className="final-cost-wrapper">
        <h4>{fareCalculatorConstants.calculatedFareTitle}</h4>
        <div className="calc-total-price">{`$${totalPrice}`}</div>
      </div>
    </div>
  );
};
