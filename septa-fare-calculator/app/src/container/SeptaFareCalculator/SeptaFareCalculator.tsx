import { useState } from "react";
import FareResult from "../../components/septa/FareResult/FareResult";
import ZoneSelect from "../../components/septa/RailForm/ZoneSelect/ZoneSelect";
import { IFaresData } from "../../types/types";

interface SeptaFareCalculatorProps {
	faresData: IFaresData;
}

const SeptaFareCalculator: React.FC<SeptaFareCalculatorProps> = ({ faresData }) => {
	const [fareCost, setFareCost] = useState(0);
	const [zone, setZone] = useState("");
	
	return (
		<>
			<ZoneSelect zone={zone} setZone={setZone} options={faresData.zones} />
			<FareResult fareCost={fareCost} />
		</>
	);
};

export default SeptaFareCalculator;
