class FareCalculator {
  constructor(
    whereGoing,
    whenRiding,
    purchasedAtOnboard,
    numberOfRides,
    fareZoneInfo
  ) {
    this.whereGoing = whereGoing || "Zone 4";
    this.whenRiding = whenRiding || "Weekdays";
    this.purchaseAtOnboard = purchasedAtOnboard || false;
    this.numberOfRides = numberOfRides || 1;
    this.fareZoneInfo = fareZoneInfo || {};
  }
}
