export interface IReginalRailsFaresResponse {
  info: {
    [key: string]: string;
  };
  zones: {
    name: string;
    zone: number;
    fares: {
      type: string;
      purchase: string;
      trips: number;
      price: number;
    }[];
  }[];
}
