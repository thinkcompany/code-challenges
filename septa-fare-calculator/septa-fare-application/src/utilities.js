export const calculateFare = (data, zone, type, purchase, trips) => {
	console.log(type);
	console.log(purchase);
	// Create an array that contains only the fare info and use the zone state to access the necessary index
	const zoneFares = Array.from(data, element => element.fares)[zone - 1];
	const fare = zoneFares.filter(element => element.type == type && element.purchase == purchase);

    const total = fare[0]?.type === "anytime" ? (fare[0]?.price / 10) * trips : fare[0]?.price * trips;
    console.log(total);

	return total.toFixed(2);
};
