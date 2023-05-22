import { useState } from "react";
import FareResult from "../../components/septa/FareResult/FareResult";
import PurchaseLocationSelect from "../../components/septa/RailForm/PurchaseLocationSelect/PurchaseLocationSelect";
import RideAmountInput from "../../components/septa/RailForm/RideAmountInput/RideAmountInput";
import TimeTravelSelect from "../../components/septa/RailForm/TimeTravelSelect/TimeTravelSelect";
import ZoneSelect from "../../components/septa/RailForm/ZoneSelect/ZoneSelect";
import { IFaresData } from "../../types/types";

interface SeptaFareCalculatorProps {
	faresData: IFaresData;
}

const SeptaFareCalculator: React.FC<SeptaFareCalculatorProps> = ({ faresData }) => {
	const [fareCost, setFareCost] = useState(0);
	const [zone, setZone] = useState("");
	const [timeTravel, setTimeTravel] = useState("");
	const [location, setLocation] = useState("");
	const [amount, setAmount] = useState(0);

	// select time travel options according to ride quantity and purchase location
	const timeTravelOptions =
		amount >= 10 && location === "advance_purchase"
			? Object.keys(faresData.info).slice(0, 3)
			: Object.keys(faresData.info).slice(1, 3);

	return (
		<>
			<ZoneSelect zone={zone} setZone={setZone} options={faresData.zones} />
			<TimeTravelSelect
				timeTravel={timeTravel}
				setTimeTravel={setTimeTravel}
				options={timeTravelOptions}
				info={faresData.info[timeTravel]}
			/>
			<PurchaseLocationSelect location={location} setLocation={setLocation} />
			<RideAmountInput amount={amount} setAmount={setAmount} />
			<FareResult fareCost={fareCost} />
		</>
	);
};

export default SeptaFareCalculator;
