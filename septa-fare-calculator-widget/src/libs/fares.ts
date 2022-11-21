import { IReginalRailsFaresData } from 'src/types/IReginalRailsFaresData';
import { IReginalRailsFaresResponse } from 'src/types/IReginalRailsFaresResponse';
import { ISelectOption } from 'src/types/ISelectOption';
import { deepGet, deepSet } from './objects';
import { humanizeString } from './strings';

export const transformFaresData = (
  data?: IReginalRailsFaresResponse,
): IReginalRailsFaresData | undefined => {
  if (!data) {
    return;
  }

  const fareZones: ISelectOption[] = [];
  const fareTypesObj: Record<
    string,
    Pick<ISelectOption, 'label' | 'description'>
  > = {};
  const farePurchasesObj: Record<
    string,
    Pick<ISelectOption, 'label' | 'description'>
  > = {};
  const faresMapping: any = {};

  data.zones.forEach((zoneData) => {
    fareZones.push({
      label: zoneData.name,
      value: zoneData.zone,
    });

    zoneData.fares.forEach((fareItem) => {
      if (fareItem.type !== 'anytime' && !fareTypesObj[fareItem.type]) {
        fareTypesObj[fareItem.type] = {
          label: humanizeString(fareItem.type),
          description: data.info[fareItem.type],
        };
      }
      if (!farePurchasesObj[fareItem.purchase]) {
        farePurchasesObj[fareItem.purchase] = {
          label: humanizeString(fareItem.purchase),
          description: data.info[fareItem.purchase],
        };
      }

      let tripPrices = deepGet(faresMapping, [
        zoneData.zone,
        fareItem.type,
        fareItem.purchase,
      ]);

      if (!tripPrices) {
        tripPrices = [];
      }

      deepSet(
        faresMapping,
        [zoneData.zone, fareItem.type, fareItem.purchase],
        [...tripPrices, { trips: fareItem.trips, price: fareItem.price }],
      );
    });
  });

  return {
    fareZones,
    fareTypes: Object.keys(fareTypesObj).map((value) => ({
      ...fareTypesObj[value],
      value,
    })),
    farePurchases: Object.keys(farePurchasesObj).map((value) => ({
      ...farePurchasesObj[value],
      value,
    })),
    faresMapping,
  };
};
