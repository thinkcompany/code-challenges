import { useState } from "react";
import FareResult from "../../components/septa/FareResult/FareResult";
import PurchaseLocationSelect from "../../components/septa/RailForm/PurchaseLocationSelect/PurchaseLocationSelect";
import RideAmountInput from "../../components/septa/RailForm/RideAmountInput/RideAmountInput";
import ZoneSelect from "../../components/septa/RailForm/ZoneSelect/ZoneSelect";
import { IFaresData } from "../../types/types";

interface SeptaFareCalculatorProps {
	faresData: IFaresData;
}

const SeptaFareCalculator: React.FC<SeptaFareCalculatorProps> = ({ faresData }) => {
	const [fareCost, setFareCost] = useState(0);
	const [zone, setZone] = useState("");
	const [location, setLocation] = useState("");
	const [amount, setAmount] = useState(0);

	return (
		<>
			<ZoneSelect zone={zone} setZone={setZone} options={faresData.zones} />
			<PurchaseLocationSelect location={location} setLocation={setLocation} />
			<RideAmountInput amount={amount} setAmount={setAmount} />
			<FareResult fareCost={fareCost} />
		</>
	);
};

export default SeptaFareCalculator;
