// constants to keep values... constant... across all frontend and backend implementations
// using/editing these values is simpler and safer than using/editing individual instances of those values
const ADVANCE_PURCHASE_LABEL = "Station Kiosk";
const ONBOARD_PURCHASE_LABEL = "Onboard";

export const ADVANCE_PURCHASE_VALUE = "advance_purchase";
const ONBOARD_PURCHASE_VALUE = "onboard_purchase";

export const PURCHASE_TYPES = [
    { label: ADVANCE_PURCHASE_LABEL, value: ADVANCE_PURCHASE_VALUE },
    { label: ONBOARD_PURCHASE_LABEL, value: ONBOARD_PURCHASE_VALUE },
];

const WEEKDAY_LABEL = "Weekday";
const EVENING_WEEKEND_LABEL = "Evening/Weekend";
const ANYTIME_LABEL = "Anytime";

const WEEKDAY_VALUE = "weekday";
const EVENING_WEEKEND_VALUE = "evening_weekend";
export const ANYTIME_VALUE = "anytime";
export const ANYTIME_TRAVEL_NOTE = "10 trips per 1 Anytime ticket";

export const TRAVEL_TIMES = [
    { label: WEEKDAY_LABEL, value: WEEKDAY_VALUE },
    { label: EVENING_WEEKEND_LABEL, value: EVENING_WEEKEND_VALUE },
    { label: ANYTIME_LABEL, value: ANYTIME_VALUE },
];
