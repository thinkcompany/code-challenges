import { useState } from "react";
import SelectDropdown from "../../components/common/SelectDropDown/SelectDropDown";
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
