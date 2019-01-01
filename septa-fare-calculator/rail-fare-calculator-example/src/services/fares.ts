import { IZone } from "../../domain";

export enum TypeOption {
  Anytime = "anytime",
  Weekday = "weekday",
  EveningWeekend = "evening_weekend"
}

export enum PurchaseOption {
  Advance = "advance_purchase",
  Onboard = "onboard_purchase"
}

const sortByPrice = (a: number, b: number) => a - b;

export const getTotalPrice = (
  zones: IZone[],
  userInput: {
    ridesCount?: number;
    selectedPurchaseType: string;
    selectedType: string;
    selectedZone: number;
  }
) => {
  const selectedZone = zones.find(zone => zone.zone === userInput.selectedZone);

  if (!selectedZone || !userInput.ridesCount) {
    return null;
  }

  // Filter only the valid fares, based on user selections
  const validFares = selectedZone.fares
    .filter(fare =>
      userInput.selectedType === TypeOption.Anytime
        ? true
        : fare.type === userInput.selectedType ||
          fare.type === TypeOption.Anytime
    )
    .filter(fare => fare.purchase === userInput.selectedPurchaseType);

  // Filter single trip fares and sort from lowest to highest
  const singleTripFares = validFares
    .filter(fare => fare.trips === 1)
    .map(fare => fare.price)
    .sort(sortByPrice);

  // Find the special offer for 10 trips
  const specialOffer = validFares.find(fare => fare.trips === 10);

  // Select the single trip fare and calculate the total price without special offer.
  // If "anytime" is selected, use the highest fare, otherwise use the lowest fare
  const singleTripFare =
    userInput.selectedType === TypeOption.Anytime
      ? singleTripFares[singleTripFares.length - 1]
      : singleTripFares[0];

  const singleTripTotal = singleTripFare * userInput.ridesCount;

  if (userInput.ridesCount < 10 || !specialOffer) {
    return formatPrice(singleTripTotal);
  } else if (userInput.ridesCount >= 10 && specialOffer) {
    const offerCount = Math.floor(userInput.ridesCount / specialOffer.trips);
    const numberOfNormalPriceTickets =
      userInput.ridesCount % specialOffer.trips;

    const offerPrice =
      offerCount * specialOffer.price +
      numberOfNormalPriceTickets * singleTripFare;

    // Always return the lowest price. E.g. if 10-trip offer price is not lower than normal price
    return formatPrice(Math.min(offerPrice, singleTripTotal));
  } else {
    return null;
  }
};

const formatPrice = (price: number) => price.toFixed(2);
