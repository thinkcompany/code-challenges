export const findZone = (zones, zoneVal,updateZone) => {
  for (let oneZone of zones) {
    const { zone } = oneZone;
    if (zone === zoneVal) {
      updateZone(oneZone)
      break;
    }
  }
}

export const formatName = (str) => {
  if (str.includes('_')) {
    return str.split('_').map(word => word[0].toUpperCase() + word.slice(1)).join(' or ')
  } else {
    return str[0].toUpperCase() + str.slice(1)
  }
}

export const formatCost = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});