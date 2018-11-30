// setting const values as a single source of truth
export const FORM_NAMES = {
  zone: 'zone',
  timeOfRide: 'timeOfRide',
  purchaseLocation: 'purchaseLocation',
  trips: 'trips'
}

export const PURCHASE_LOCATION_VALUES = {
  advanced: 'advance_purchase',
  onboard: 'onboard_purchase'
}

export const TIME_OF_RIDE_VALUES = {
  weekday: 'weekday',
  eveningWeekend: 'evening_weekend',
  anytime: 'anytime'
}

export const DEFAULT_FORM_VALUES = {
  [FORM_NAMES.zone]: 1,
  [FORM_NAMES.timeOfRide]: TIME_OF_RIDE_VALUES.anytime,
  [FORM_NAMES.purchaseLocation]: PURCHASE_LOCATION_VALUES.advanced,
  [FORM_NAMES.trips]: 1
}