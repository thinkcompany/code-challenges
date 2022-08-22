export const findZone = (zones, zoneVal,updateZone) => {
  for (let oneZone of zones) {
    const { zone } = oneZone;
    if (zone === zoneVal) {
      updateZone(oneZone)
      break;
    }
  }
}