export const calculateFare = (data, zone, type, purchase, trips) => {
	const {zones, info} = data;
	// Creates an array of fares for the zone that was selected
	const zoneFares = Array.from(zones, element => element.fares)[zone - 1];
	// It finds the fare for the given type and purchase from state and then calculates the total
	const fare = zoneFares.find(element => element.type == type && element.purchase == purchase);
	const total = fare?.type === Object.keys(info)[0] ? (fare?.price / 10) * trips : fare?.price * trips;

	return total.toFixed(2);
};
