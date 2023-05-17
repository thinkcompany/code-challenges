
export interface FetchAPIResponse {
  responseData: Data | null;
  loading: boolean;
  error: string | null;
}

export interface Data {
  info:  Info;
  zones: Zone[];
}

export interface Info {
  anytime:          string;
  weekday:          string;
  evening_weekend:  string;
  advance_purchase: string;
  onboard_purchase: string;
}

export interface Zone {
  name:  string;
  zone:  number;
  fares: Fare[];
}

export interface Fare {
  type:     Type;
  purchase: Purchase;
  trips:    number;
  price:    number;
}

export enum Purchase {
  AdvancePurchase = "advance_purchase",
  OnboardPurchase = "onboard_purchase",
}

export enum Type {
  EveningWeekend = "evening_weekend",
  Weekday = "weekday",
}

export interface FormHandler {
  selectedZoneValue: string;
  selectedTravelTime: string;
  locationValue: string;
  calculationValue: number;
  calculatedPrice: string;
  purchaseOptions: { name: string }[] | null;
  setSelectedZoneValue: (value: string) => void;
  setSelectedTravelTime: (value: string) => void;
  setLocationValue: (value: string) => void;
  setCalculationValue: (value: number) => void;
  setCalculatedPrice: (value: string) => void;
};