export const calcPrice = (
  fares: any,
  zone: string,
  fareType: string,
  farePurchase: string,
  rides: number
) => {
  if (!fares || !zone || !fareType || !farePurchase) return 0
  const price = fares.zones
    .find((z: any) => z.zone === zone)?.fares
    .find((fare: any) => fare.type === fareType && fare.purchase === farePurchase)?.price
  return (price || 0) * rides
}
