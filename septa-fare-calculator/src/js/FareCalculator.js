class FareCalculator {
  constructor(
    whereGoing,
    whenRiding,
    purchasedAtOnboard,
    numberOfRides,
    fareZoneInfo
  ) {
    this.whereGoing = parseInt(whereGoing.split(" ")[1]) || 4;
    this.whenRiding =
      !whenRiding === "anytime" || !whenRiding === "weekday"
        ? "evening_weekend"
        : whenRiding;
    this.purchasedAtOnboard = purchasedAtOnboard
      ? "onboard_purchase"
      : "advance_purchase";
    this.numberOfRides = numberOfRides || 4;
    this.fareZoneInfo = fareZoneInfo || [];
  }

  setWhereGoing(str) {
    this.whereGoing = parseInt(str.split(" ")[1]);
  }

  setWhenRiding(str) {
    const whenRiding =
      str === "anytime" || str === "weekday" ? str : "evening_weekend";
    this.whenRiding = whenRiding;
  }

  setPurchasedAtOnboard(boolean) {
    const purchasedAtOnboard = boolean
      ? "onboard_purchase"
      : "advance_purchase";
    this.purchasedAtOnboard = purchasedAtOnboard;
  }

  setNumberOfRides(num) {
    this.numberOfRides = num;
  }

  calculateFare() {
    let price;
    const fareZone = this.fareZoneInfo.find((z) => z.zone === this.whereGoing);

    //because everything except anytime and weekday share same pricing, this parses the user's preference to coincide with the json.
    //however, we kept  the values as user-friendly labels in the html for screen readers
    const fareType = fareZone.fares.filter((fare) => {
      return fare.type === this.whenRiding;
    });

    //we can end the function early if "anytime" is selected, because that's all the info we need to get the user's price - only one anytime price exists per zone
    if (this.whenRiding === "anytime") {
      price = fareType[0].price;

      return price;
    }

    const farePurchase = fareType.find(
      (fare) => fare.purchase === this.purchasedAtOnboard
    );

    price = farePurchase.price;

    return price;
  }
}
