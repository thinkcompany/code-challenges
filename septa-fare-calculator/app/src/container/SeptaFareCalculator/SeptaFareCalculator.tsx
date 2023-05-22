import { useState } from "react";
import FareResult from "../../components/septa/FareResult/FareResult";

const SeptaFareCalculator = () => {
	const [fareCost, setFareCost] = useState(0);
	return (
		<>
			<FareResult fareCost={fareCost} />
		</>
	);
};

export default SeptaFareCalculator;
